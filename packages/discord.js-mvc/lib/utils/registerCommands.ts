import {
  REST,
  Routes,
  type SlashCommandBuilder,
  type RESTOptions,
} from 'discord.js'
import fs from 'fs'
import path from 'path'


/**
 * Represents a list of commands.
 */
type CommandsList = Array<Record<string, any>>;

/**
 * Represents the options for the Discord application.
 */
interface AppOptions {
  token: string;
  clientId: string;
}

/**
 * Represents the options for the Discord guild application.
 */
interface AppGuildOptions extends AppOptions {
  guildId: string;
}

/**
 * Represents the base options for registering commands.
 */
interface BaseRegisterCommandsOptions {
  dir: string;
  app: AppOptions | AppGuildOptions;
  rest?: Partial<RESTOptions>;
}

/**
 * Represents the options for registering guild commands.
 */
interface RegisterGuildCommandsOptions extends BaseRegisterCommandsOptions {
  app: AppGuildOptions;
}

/**
 * Represents the options for registering global commands.
 */
interface RegisterGlobalCommandsOptions extends BaseRegisterCommandsOptions {
  app: AppOptions;
}

/**
 * Retrieves all the commands from the specified directory.
 * @param dir The directory to scan for commands.
 * @returns A promise that resolves to the list of commands.
 */
const getAllCommands = async (
  dir: string = ''
): Promise<CommandsList | undefined> => {
  const commands: CommandsList = [];
  const commandsFolder = path.join(process.cwd(), dir);
  const commandsFiles = fs.readdirSync(commandsFolder);
  commandsFiles.forEach((file) => {
    const filePath = path.join(commandsFolder, file);
    const fileStat = fs.lstatSync(filePath);
    if (fileStat.isDirectory()) {
      getAllCommands(path.join(dir, file));
    }
    if (fileStat.isFile() && (file.endsWith('.ts') || file.endsWith('.js'))) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const command = require(filePath);
      if (command.default) {
        const commandBuilder: SlashCommandBuilder = command.default;
        commands.push(commandBuilder.toJSON());
      } else if (command.Command) {
        const commandBuilder: SlashCommandBuilder = new command.Command();
        commands.push(commandBuilder.toJSON());
      }
    }
  });
  return commands;
};

/**
 * Registers guild commands for the Discord application.
 * @param options The options for registering guild commands.
 * @param onSuccess Optional callback function to execute on successful registration.
 * @param onError Optional callback function to execute on error during registration.
 * @returns A promise that resolves when the registration is completed.
 */
export const registerGuildCommands = async (
  options: RegisterGuildCommandsOptions,
  onSuccess?: (data: unknown) => Promise<void> | void,
  onError?: (error: any) => Promise<void> | void
): Promise<void> => {
  const commands = await getAllCommands(options.dir);
  const rest = new REST(options.rest).setToken(options.app.token);
  try {
    const data = await rest.put(
      Routes.applicationGuildCommands(
        options.app.clientId,
        options.app.guildId
      ),
      { body: commands }
    );
    if (onSuccess) {
      await onSuccess(data);
    }
  } catch (error) {
    console.error(error);
    if (onError) {
      await onError(error);
    }
  }
};

/**
 * Registers global commands for the Discord application.
 * @param options The options for registering global commands.
 * @param onSuccess Optional callback function to execute on successful registration.
 * @param onError Optional callback function to execute on error during registration.
 * @returns A promise that resolves when the registration is completed.
 */
export const registerGlobalCommands = async (
  options: RegisterGlobalCommandsOptions,
  onSuccess?: (data: unknown) => Promise<void> | void,
  onError?: (error: any) =>Promise<void> | void
): Promise<void> => {
  const commands = await getAllCommands(options.dir);
  if (commands === undefined) return;
  const rest = new REST(options.rest).setToken(options.app.token);
  try {
    const data = await rest.put(
      Routes.applicationCommands(options.app.clientId),
      {
        body: commands,
      }
    );
    if (onSuccess) {
      await onSuccess(data);
    }
  } catch (error) {
    console.error(error);
    if (onError) {
      await onError(error);
    }
  }
};
