import { useState } from "react";
import { useReactToPrint } from "react-to-print";

export const usePrinting = (componentRef) => {
  const [isPrintPopupVisible, setIsPrintPopupVisible] = useState(false);

  const handleClosePrintPopup = () => {
    setIsPrintPopupVisible(false);
  };

  const handlePrintClick = () => {
    setIsPrintPopupVisible(true);
  };

  const reactToPrintFn = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        margin: 0;
      }
      body {
        background-color: #f1f5f9;
        -webkit-print-color-adjust: exact;
      }
    `,
    onAfterPrint: () => handleClosePrintPopup(),
  });

  return {
    componentRef,
    isPrintPopupVisible,
    handlePrintClick,
    handleClosePrintPopup,
    reactToPrintFn,
  };
};