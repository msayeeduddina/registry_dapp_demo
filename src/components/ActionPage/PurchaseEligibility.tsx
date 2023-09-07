import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Button, Card, Text } from "../ui";
import { TextSizes as _TextSizes } from "../ui/Text";
import { CenteredElement } from "../ui/CenteredElement";
import fractalRegistry from "../../contracts/FractalRegistry";
import useWeb3 from "../../hooks/web3";
import { KYCList } from "../../hooks/miniBackoffice";
import { unreachable } from "../../lib/types";

const CardBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const NewLine = () => <br />;

const ONE_SECOND = 1000;

export const PurchaseEligibility = () => {
  const { account, library } = useWeb3();
  const [userInList, setUserInList] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!account || !library) {
      setUserInList(undefined);
      return () => undefined;
    }

    const connectRegistry = fractalRegistry.connect(library.getSigner());

    const interval = setInterval(() => {
      connectRegistry
        .getFractalId(account)
        .then((fractalId) => connectRegistry.isUserInList(fractalId, KYCList))
        .then(setUserInList)
        // eslint-disable-next-line no-console
        .catch((e) => console.error(e));
    }, ONE_SECOND);

    return () => clearInterval(interval);
  }, [account]);

  let content;
  if (!account) {
    content = <>Connect your wallet. 👛</>;
  } else if (userInList === undefined) {
    content = <>Checking chain state... ⏱</>;
  } else if (userInList === false) {
    content = (
      <>
        You are <strong>NOT</strong> in the KYC List in the DID Registry so are
        not able to make purchase.
      </>
    );
  } else if (userInList === true) {
    content = (
      <>
        You <strong>ARE</strong> in the KYC List in the DID Registry so you are
        cleared to make a purchase!
      </>
    );
  } else {
    unreachable(userInList);
  }

  return (
    <Card title="Purchase eligibility">
      <CardBodyContainer>
        <CenteredElement>
          <Text size={_TextSizes.EXTRA_SMALL}>{content}</Text>
        </CenteredElement>
        <CenteredElement>
          <NewLine />
          <Button width="50%" disabled={!userInList}>
            Purchase
          </Button>
        </CenteredElement>
      </CardBodyContainer>
    </Card>
  );
};

export default PurchaseEligibility;
