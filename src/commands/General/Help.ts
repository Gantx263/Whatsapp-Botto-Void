import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'help',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            dm: true,
            aliases: ['h']
        })
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
        if (!parsedArgs.joined) {
            const commands = this.handler.commands.keys()
            const categories: { [key: string]: ICommand[] } = {}
            for (const command of commands) {
                const info = this.handler.commands.get(command)
                if (!command) continue
                if (!info?.config?.category || info.config.category === 'dev') continue
                if (Object.keys(categories).includes(info.config.category)) categories[info.config.category].push(info)
                else {
                    categories[info.config.category] = []
                    categories[info.config.category].push(info)
                }
            }
            let text = let text`🎫 *return `╭─「 *Ahoyou!*(♥️w♥️) *I am Koneko~Nyaa* 」
  
 *「Bot Prefix」* - *「 ${client._config.prefix} 」*
 *「Owner」* *${client._config.prefix}https://wa.me/263715606285*
╰─────────────────┈ ❁ཻུ۪۪⸙͎	
─────────────────┈ ❁ཻུུ۪۪۪۪
🌟️ *𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗟𝗜𝗦𝗧* 🌟️
─────────────────┈ ❁ཻུུ۪۪۪۪

╭─「 ♦️General-Commands♦️ 」
│ 
│❏ *${client._config.prefix}profile*
│❏ *${client._config.prefix}admins*
│❏ *${client._config.prefix}ping*
│❏ *${client._config.prefix}owner*
│❏ *${client._config.prefix}xp*
╰─────────────────┈ ❁ཻུ۪۪⸙͎

╭─「 ♦️Media-Commands♦️ 」
│ 
│ ♦️ *${client._config.prefix}lyrics*
│ ♦️ *${client._config.prefix}yts*
│ ♦️ *${client._config.prefix}yta*
│ ♦️ *${client._config.prefix}ytv*
│ ♦️ *${client._config.prefix}sticker*
│ ♦️ *${client._config.prefix}play*
│ ♦️ *${client._config.prefix}steal*
│ ♦️ *${client._config.prefix}subred*
╰─────────────────┈ ❁ཻུ۪۪⸙͎
  
╭─「 ♦️Admin-Commands♦️ 」
│   
│ ♦️ *${client._config.prefix}act*
│ ♦️ *${client._config.prefix}purge*
│ ♦️ *${client._config.prefix}open*
│ ♦️ *${client._config.prefix}close*
│ ♦️ *${client._config.prefix}everyone*
│ ♦️ *${client._config.prefix}promote*
│ ♦️ *${client._config.prefix}demote*
│ ♦️ *${client._config.prefix}deact*
│ ♦️ *${client._config.prefix}remove*
╰─────────────────┈ ❁ཻུ۪۪⸙͎
♦️───────────────┈ ❁۪۪
╭─「 ♦️Owner-Commands♦️ 」
│
│ ♦️ *${client._config.prefix}eval*
│ ♦️ *${client._config.prefix}unban*
│ ♦️ *${client._config.prefix}ban*
│ ♦️ *${client._config.prefix}broadcast*
╰─❁۪۪─────────┈ ❁ཻཻུུ۪۪۪۪⸙͎
─────────────────┈ ❁۪۪──
 *「Kaoi-Botto」*
┃╭────────╯   
┃│📢 *Github: https://github.com/Gantx-Hckr*
┃│📢 *Simp Freakin Sama
╰─────────────────┈ ❁ཻུ۪۪⸙͎║* 🎫\n\n`
            const keys = Object.keys(categories)
            for (const key of keys)
                text += `${this.emojis[keys.indexOf(key)]} *${this.client.util.capitalize(key)}*\n❐ \`\`\`${categories[
                    key
                ]
                    .map((command) => command.config?.command)
                    .join(', ')}\`\`\`\n\n`
            return void M.reply(
                `${text} 🗃️ *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`
            )
        }
        const key = parsedArgs.joined.toLowerCase()
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void M.reply(`No Command of Alias Found | "${key}"`)
        const state = await this.client.DB.disabledcommands.findOne({ command: command.config.command })
        M.reply(
            `🎫 *Command:* ${this.client.util.capitalize(command.config?.command)}\n🎗️ *Status:* ${
                state ? 'Disabled' : 'Available'
            }\n🀄 *Category:* ${this.client.util.capitalize(command.config?.category || '')}${
                command.config.aliases
                    ? `\n🍥 *Aliases:* ${command.config.aliases.map(this.client.util.capitalize).join(', ')}`
                    : ''
            }\n🃏 *Group Only:* ${this.client.util.capitalize(
                JSON.stringify(!command.config.dm ?? true)
            )}\n🎀 *Usage:* ${command.config?.usage || ''}\n\n🔖 *Description:* ${command.config?.description || ''}`
        )
    }

    emojis = ['🌀', '🎴', '🔮', '👑', '🎈', '⚙️', '🍀']
}
