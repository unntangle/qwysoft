import { Google_Sans_Code, Google_Sans_Flex } from "next/font/google";

/**
 * One family for the whole site, as on antigravity.google:
 * Google Sans Flex for headlines, UI, body and numbers.
 * The optical-size axis lets large headlines tighten automatically.
 */
export const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google-sans",
  axes: ["opsz"],
  display: "swap",
});

/** Code panels only. */
export const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-google-sans-code",
  display: "swap",
});
