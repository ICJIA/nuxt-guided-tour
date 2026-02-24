export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.htmlAttrs = html.htmlAttrs.map((attr: string) => attr.replace(/\s+/g, ' ').trim())
  })
})
