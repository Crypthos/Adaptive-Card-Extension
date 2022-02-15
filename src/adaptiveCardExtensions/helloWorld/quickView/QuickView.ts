import {
  ISPFxAdaptiveCard,
  BaseAdaptiveCardView,
  ICardButton,
  IActionArguments,
} from "@microsoft/sp-adaptive-card-extension-base";
import * as strings from 'HelloWorldAdaptiveCardExtensionStrings';
import { IHelloWorldAdaptiveCardExtensionProps, IHelloWorldAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../HelloWorldAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  
}

export class QuickView extends BaseAdaptiveCardView<
  IHelloWorldAdaptiveCardExtensionProps,
  IHelloWorldAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
    };
  }

  public get cardButtons():
    | [ICardButton]
    | [ICardButton, ICardButton]
    | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: "QuickView",
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID,
          },
        },
      },
      {
        title: strings.QuickViewButton,
        action: {
          type: "QuickView",
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID,
          },
        },
      },
    ];
  }

  public onAction(action: IActionArguments): void {
    if (action.type === "Submit") {
      const { id, message } = action.data;
      switch (id) {
        case "button1":
        case "button2":
          this.setState({
            subTitle: message,
          });
          break;
      }
    }
  }

  public get template(): ISPFxAdaptiveCard {
    return require("./template/QuickViewTemplate.json");
  }
}