import {
  buttonBaseStyles,
  buttonBaseStylesCustom,
  cancelButtonStyles,
  formCard,
  formContainer,
  formContent,
  formGrid,
  formHeader,
  formStyles,
  inputBaseStyles,
  labelStyles,
  moreButtonStyles,
  scrollContainer,
  submitButtonStyles,
} from "./Common.FormStyles";
import { FormInput } from "./Common.Input";
import { NeonSelect, SelectOption } from "./Common.Select";
import FuzzyText from "./Common.Titile";
import { BentoTilt } from "./Common.card3D";
import { SpotlightCard } from "./Common.cardCursor";
export { TextGenerateEffect } from "./Common.Parrafe";

// Styles exports
export * from "./Common.FormStyles";
export { default as FuzzyText } from "./Common.Titile"; // Note: Check if filename is correct ("Title" vs "Titile")

// Component exports
export { FormInput } from "./Common.Input";
// export { VariableProximity };
export { NeonSelect } from "./Common.Select";
export type { SelectOption } from "./Common.Select";
export { BentoTilt } from "./Common.card3D";
export { SpotlightCard } from "./Common.cardCursor";
// export { GlassIcons } from "./Common.ButtonBlur";
export { GradientBackground } from "./Common.ContainerFather";
