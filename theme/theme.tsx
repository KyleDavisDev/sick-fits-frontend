import * as styledComponents from "styled-components";

const {
  default: styled,
  css,
  keyframes,
  injectGlobal,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export interface ThemeInterface {
  primaryThemeColor?: string;
  primaryDarkThemeColor?: string;
  primaryLightThemeColor?: string;
  secondaryThemeColor?: string;
  navigationTextColor?: string;
  navigationIconColor?: string;
  landingHeroTextColor?: string;
  cardBackgroundColor?: string;

  siteBackgroundColor?: string;

  maxPageWidth?: string;
  scaleP?: string;
  scaleH1?: string;
  scaleH2?: string;
  scaleH3?: string;
  scaleH4?: string;
  scaleH5?: string;
  scaleH6?: string;
  exToSm?: string;
  smToMd?: string;
  mdToLg?: string;
  defaultFontSize?: string;

  white?: string;
  grey?: string;
  lightGrey?: string;
  darkGrey?: string;
  black?: string;
  red?: string;
  smoke?: string;
  boxShadow?: string;
}

enum colors {
  white = "#fff",
  grey = "#3A3A3A",
  lightGrey = "#E1E1E1",
  darkGrey = "#555",
  mustard = "#FFA816",
  darkMustard = "#c97e00",
  lightMustard = "#fff4e3",
  smoke = "#EDEDED",
  black = "#393939",
  red = "#FF0000",
  boxShadow = "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
}

enum scale {
  defaultFontSize = "16px",
  maxPageWidth = "1000px",
  footerMaxWidth = "300px",
  scaleP = "1rem",
  scaleH1 = "2.5rem",
  scaleH2 = "2.25rem",
  scaleH3 = "2rem",
  scaleH4 = "1.875rem",
  scaleH5 = "1.125rem",
  scaleH6 = "1rem",
  exToSm = "560px",
  smToMd = "768px",
  mdToLg = "900px"
}

export const theme: ThemeInterface = {
  primaryThemeColor: colors.red,
  black: colors.black,
  grey: colors.grey,
  lightGrey: colors.lightGrey,
  smoke: colors.smoke,
  maxPageWidth: scale.maxPageWidth,
  boxShadow: colors.boxShadow
};

export { css, keyframes, injectGlobal, ThemeProvider };
export default styled;
