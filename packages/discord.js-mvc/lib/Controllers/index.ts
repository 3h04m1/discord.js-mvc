import { BaseContext } from "../base/Context";
import { MaybePromise } from "../types";

/**
 * Represents a controller function for handling interactions.
 * @template T - The type of interaction to be handled. Defaults to `Interaction`.
 * @param req - The interaction to be handled.
 * @param params - Additional parameters extracted from route processing.
 * @returns A promise that resolves when the handling of the interaction is complete.
 * @example
 * // Define a controller function for handling slash command interactions
 * const slashCommandController: Controller<SlashCommandInteraction> = async (req, params) => {
 *   // Handle the slash command interaction
 *   const { commandName, options } = req;
 *   // ...
 * };
 *
 * // Define a controller function for handling button interactions
 * const buttonController: Controller<ButtonInteraction> = async (req, params) => {
 *   // Handle the button interaction
 *   const { customId, user } = req;
 *   // ...
 * };
 */


export type Controller<T extends BaseContext = BaseContext> = (
  ctx: T,
) => MaybePromise<void>;
