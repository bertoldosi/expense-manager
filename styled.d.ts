import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundPrimary: string;
    textPrimary: string;

    backgroundSecondary: string;
    textSecondary: string;

    backgroundSecondaryContrast: string;
    textSecondaryContrast: string;

    backgroundInfo: string;
    textInfo: string;

    backgroundSuccess: string;
    textSuccess: string;

    backgroundWarning: string;
    textWarning: string;

    backgroundDanger: string;
    textDanger: string;
  }
}
