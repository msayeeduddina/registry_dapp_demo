import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Text, Title, TopComponent } from "../ui";
import { TextLineHeights, TextWeights } from "../ui/Text";
import Collapsible from "../ui/Collapsible";

import useWeb3 from "../../hooks/web3";
import Connect from "./Connect";
import MiniBackoffice from "./MiniBackoffice";
import PurchaseEligibility from "./PurchaseEligibility";
import HeroDots from "../../assets/images/hero_dots.svg";
import useMiniBackoffice from "../../hooks/miniBackoffice";
import { unreachable } from "../../lib/types";

const HeroSection = styled.section`
  height: calc(100vh - 76px);
  display: flex;

  @media (min-width: 768px) {
    height: auto;
  }
`;

const HeroContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (min-width: 768px) {
    display: block;
    margin-bottom: 100px;
  }
`;

const HeroDotsContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: -10;

  display: flex;
  justify-content: center;

  width: 100vw;
`;

type HeroStyleProps = {
  justifyContent?: string;
};
const HeroRow = styled.div<HeroStyleProps>`
  display: flex;
  width: 100%;
  flex-direction: column;

  @media (min-width: 768px) {
    text-align: left;
    flex-direction: row;
    justify-content: ${(props) => props.justifyContent ?? "space-between"};
    margin-bottom: 2em;
  }
`;

const HeroTitleColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubtitleContainer = styled.div`
  margin: 0.5em;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }

  // keep <p> height when empty
  p:empty::before {
    content: "";
    display: inline-block;
  }
`;

const NewLine = () => <br />;

export default function Hero() {
  const { active, account, chainId, library } = useWeb3();
  const backoffice = useMiniBackoffice(account, chainId, library);
  const [registryStatus, setRegistryStatus] = useState<string>("");

  useEffect(() => {
    let status = "";
    switch (backoffice.status) {
      case "UnregisteredUser":
        status =
          " but your address is not in the DID Registry. So, you can't purchase yet! Use the Backoffice control in step #2 to update the DID Registry.";
        break;
      case "KYCApproved":
        status =
          ", your address is in the DID Registry AND you are in the KYC List. So, you can purchase! ";
        break;
      case "Loading":
        status = " but your status is getting updated in the Registry.";
        break;
      case "Error":
        status = " but there was an error accessing the Registry.";
        break;
      case "Unconfigured":
        status = " but the Registry thinks your wallet is not connected.";
        break;
      default:
        unreachable(backoffice);
    }

    setRegistryStatus(status);
  }, [backoffice.status]);

  return (
    <HeroSection>
      <HeroDotsContainer>
        <HeroDots />
      </HeroDotsContainer>
      <TopComponent>
        <HeroContainer>
          <HeroRow>
            <HeroTitleColumn>
              <Title>Fractal&apos;s DID Registry User Demo</Title>
              <Collapsible>
                <SubtitleContainer>
                  <Text size="20px" lineHeight="30px">
                    This demo shows you how changes to the{" "}
                    <strong>DID Registry</strong> impact how your users will
                    experience logging in to your dApp.
                    <NewLine />
                    <NewLine />
                    When you connect your wallet to this dApp in Step #1 below,
                    the dApp automatically checks the DID Registry to see if you
                    are eligible to purchase. If your wallet address is in the
                    DID Registry and you are in the KYC List, then you are
                    eligible to purchase.
                    <NewLine />
                    <NewLine />
                    You can use Step #2 below to update the DID Registry. If
                    your wallet address is not in the DID Registry, you can add
                    it. If you are not in the KYC List, you can add yourself. In
                    a similar way, you can remove yourself from the KYC List or
                    remove your wallet address from DID Registry. These are NOT
                    actions your user can take but meant to demonstrate how your
                    dApp can query the DID Registry and you can show or hide
                    actions (like voting or purchasing) based on the status in
                    the DID Registry.
                    <NewLine />
                    <NewLine />
                    <strong>You will need Görli ETH</strong> to complete this
                    demo - get some{" "}
                    <a href="https://goerli-faucet.pk910.de/">here</a> or{" "}
                    <a href="https://goerlifaucet.com/">here.</a>
                  </Text>
                </SubtitleContainer>
              </Collapsible>
            </HeroTitleColumn>
          </HeroRow>
          <HeroRow>
            <SubtitleContainer>
              <Text
                weight={TextWeights.BOLD}
                lineHeight={TextLineHeights.NORMAL}
              >
                1.
                {active
                  ? ` Your wallet is connected${registryStatus}`
                  : " Connect your wallet."}
              </Text>
            </SubtitleContainer>
          </HeroRow>
          <HeroRow justifyContent="space-evenly">
            <div style={{ width: "40%" }}>
              <Connect />
            </div>
            <div style={{ width: "40%" }}>
              {active ? <PurchaseEligibility /> : ""}
            </div>
          </HeroRow>
          <br />
          <SubtitleContainer>
            {active ? (
              <>
                <HeroRow>
                  <Text
                    weight={TextWeights.BOLD}
                    lineHeight={TextLineHeights.NORMAL}
                  >
                    2. BackOffice Control that you can use to update the DID
                    Registry.
                  </Text>
                </HeroRow>
                <HeroRow>
                  <MiniBackoffice backoffice={backoffice} />
                </HeroRow>
              </>
            ) : (
              ""
            )}
          </SubtitleContainer>
        </HeroContainer>
      </TopComponent>
    </HeroSection>
  );
}
