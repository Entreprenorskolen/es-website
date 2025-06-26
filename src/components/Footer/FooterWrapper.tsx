import { getFooterData } from "@app/hooks/server/useFooter";
import { Footer } from "./Footer";

const FooterWrapper = async () => {
  const footerData = await getFooterData();

  return <Footer footerData={footerData} />;
};

export { FooterWrapper };
