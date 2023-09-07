import { useEffect, useState } from "react";
import { ContractTransaction, providers } from "ethers";
import { keccak256 } from "ethers/lib/utils";

import { GOERLI_CHAIN_ID } from "../lib/constants";
import fractalRegistry from "../contracts/FractalRegistry";
import selfServeRegistryOperator from "../contracts/SelfServeRegistryOperator";

interface Unconfigured {
  status: "Unconfigured";
}

interface Error {
  status: "Error";
}

interface Loading {
  status: "Loading";
}

interface UnregisteredUser {
  status: "UnregisteredUser";
  addUserToRegistry: () => Promise<void>;
}

interface KYCApproved {
  status: "KYCApproved";
  fractalId: string;
  removeUserFromRegistry: () => Promise<void>;
}

export type Backoffice =
  | Unconfigured
  | UnregisteredUser
  | KYCApproved
  | Loading
  | Error;

export const KYCList = "plus";
const ZERO_USER =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

type Loadable<T> = T | "loading" | "error" | "go_fetch";

const present = <T>(value: Loadable<T>): boolean =>
  value !== "loading" && value !== "error" && value !== "go_fetch";

const fetchFractalId = (
  signer: providers.JsonRpcSigner,
  account: string
): Promise<string> => fractalRegistry.connect(signer).getFractalId(account);

const fetchKycStatus = (
  signer: providers.JsonRpcSigner,
  fractalId: string
): Promise<boolean> =>
  fractalRegistry.connect(signer).isUserInList(fractalId, KYCList);

const ensure_loaded = <T>(
  value: Loadable<T>,
  reporter: (v: Loadable<T>) => unknown,
  fetcher: () => Promise<T>
): value is T => {
  if (present(value)) return true;

  if (value === "go_fetch") {
    reporter("loading");
    fetcher()
      .then(reporter)
      .catch(() => {
        reporter("error");
      });
  }

  return false;
};

const reportTransactionTo =
  <T>(
    reporter: (v: Loadable<T>) => unknown,
    promiser: () => Promise<ContractTransaction>
  ) =>
  async (): Promise<void> => {
    let tx: ContractTransaction;
    try {
      tx = await promiser();
    } catch (e) {
      // Typically, the user rejected the transaction. However, let's keep it
      // here to debug other cases.
      // eslint-disable-next-line no-console
      console.error(e);
      return;
    }

    reporter("loading");

    await tx.wait();

    reporter("go_fetch");
  };

export const useMiniBackoffice = (
  account: string | null | undefined,
  chainId: number | undefined,
  library: providers.Web3Provider | undefined
): Backoffice => {
  const [fractalId, setFractalId] = useState<Loadable<string>>("go_fetch");
  const [kycStatus, setKycStatus] = useState<Loadable<boolean>>("go_fetch");
  const signer = library?.getSigner();

  useEffect(() => {
    setFractalId("go_fetch");
    setKycStatus("go_fetch");
  }, [account]);

  if (!account || !signer || !chainId || chainId !== GOERLI_CHAIN_ID) {
    return { status: "Unconfigured" };
  }

  if (fractalId === "error" || kycStatus === "error") {
    return { status: "Error" };
  }

  if (
    !ensure_loaded(fractalId, setFractalId, () =>
      fetchFractalId(signer, account)
    )
  ) {
    return { status: "Loading" };
  }

  if (fractalId === ZERO_USER) {
    return {
      status: "UnregisteredUser",
      addUserToRegistry: reportTransactionTo(setFractalId, () =>
        selfServeRegistryOperator
          .connect(signer)
          .addSelfToRegistry(keccak256(account), KYCList)
      ),
    };
  }

  if (
    !ensure_loaded(kycStatus, setKycStatus, () =>
      fetchKycStatus(signer, fractalId)
    )
  ) {
    return { status: "Loading" };
  }

  return {
    status: "KYCApproved",
    fractalId,
    removeUserFromRegistry: reportTransactionTo(setFractalId, () =>
      selfServeRegistryOperator.connect(signer).removeSelfFromRegistry(KYCList)
    ),
  };
};

export default useMiniBackoffice;
