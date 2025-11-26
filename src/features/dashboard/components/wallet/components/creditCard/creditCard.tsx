import {
  CreditCardWirelessIcon,
  MastercardIcon,
  VisaIcon,
} from "../../../../../../assets/icons/icons";
import type { FinancialWalletCard } from "../../../../../../types/financial";
import { twMerge } from "tailwind-merge";
import { FinancialWalletCardNetwork } from "../../../../../../utils/constants";
import { MagloLogotype } from "../../../../../../assets/images/logos";

interface CreditCardProps {
  cardData: FinancialWalletCard;
}

const CreditCard = ({ cardData }: CreditCardProps) => {
  const { expiryMonth, expiryYear, cardNumber, bank, network, isDefault } =
    cardData;
  const expiryDate = `${String(expiryMonth).padStart(2, "0")}/${expiryYear
    .toString()
    .slice(-2)}`;
  const bankName = bank.split("Maglo |")[1];
  const cardNetworkIcon = {
    [FinancialWalletCardNetwork.VISA]: <VisaIcon />,
    [FinancialWalletCardNetwork.MASTERCARD]: <MastercardIcon />,
  };

  // Calculate wrapper styles and classes
  const wrapperClasses = twMerge(
    "w-full flex justify-center max-w-[360px]",
    "relative",
    "transition-all duration-300",
    !isDefault &&
      "cursor-pointer absolute bottom-[-10px] scale-[0.9] z-10 hover:scale-[0.925]"
  );

  const containerClasses = twMerge(
    "w-full flex justify-center items-center",
    "rounded-[15px]",
    "overflow-hidden",
    !isDefault && "bg-gradient-to-b from-white/40 to-white/10"
  );
  const commanCardClasses = twMerge(
    "w-full max-w-[400px]",
    "aspect-[1.685/1]",
    "flex flex-col gap-[10px]",
    "px-[30px] py-[20px]"
  );
  const cardClasses = twMerge(
    commanCardClasses,
    !isDefault
      ? "bg-gradient-to-br from-[##959595]/0 to-[#324000]/10 backdrop-blur-[8px]"
      : "bg-gradient-to-br from-[#4A4A49] to-[#20201F] shadow-lg"
  );
  return (
    <article
      className={wrapperClasses}
      aria-label={`${bankName} ${network} card ending in ${cardNumber.slice(-4)}`}
    >
      <div className={containerClasses}>
        <div className={cardClasses}>
          <div className="flex flex-col justify-between items-center gap-[20px] w-full h-full">
            <header className="w-full flex flex-col items-start justify-start gap-[27px]">
              <div className="w-full flex flex-row items-center justify-start gap-[10px]">
                <div className="w-[56px] h-[18px] text-white" aria-hidden="true">
                  {MagloLogotype}
                </div>
                <span
                  className={twMerge(
                    "font-gordita-medium text-[12px]/[20px] text-[#626260] border-l border-l-[#626260] pl-[10px]",
                    !isDefault && "text-white border-l-white"
                  )}
                >
                  {bankName}
                </span>
              </div>
              <div className="flex flex-row items-center justify-between gap-[10px] w-full">
                <img
                  src="/src/assets/images/card-chip.png"
                  alt=""
                  role="presentation"
                />
                <div className="w-[34px] h-[34px] text-[#363B41]" aria-hidden="true">
                  <CreditCardWirelessIcon />
                </div>
              </div>
            </header>
            <footer className="w-full flex flex-1 flex-col items-start justify-start gap-[5px]">
              <div className="flex flex-col items-start">
                <p
                  className={twMerge(
                    "font-gordita-bold text-white text-[17px]/[24px] tracking-widest [word-spacing:0.5rem]",
                    !isDefault && "text-1"
                  )}
                >
                  <span className="sr-only">Card number: </span>
                  {cardNumber}
                </p>
              </div>
              <div className="flex flex-row flex-1 justify-between w-full">
                <span
                  className={twMerge(
                    "font-gordita-medium text-[#868685] text-[14px]/[100%]",
                    !isDefault && "text-2"
                  )}
                >
                  <span className="sr-only">Expiry date: </span>
                  {expiryDate}
                </span>
                <div
                  className={twMerge(
                    "text-[#ffffff] self-end",
                    !isDefault && "text-[#1A1F71]"
                  )}
                  aria-label={`${network} network`}
                >
                  {cardNetworkIcon[network]}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CreditCard;
