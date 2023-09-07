var plugins = [{
      name: 'gatsby-plugin-image',
      plugin: require('C:/Users/user/Desktop/CYPERTS/FILES/GITHUB_CODES/GIT-Repo/14.did-registry-demo-dapp-main/node_modules/gatsby-plugin-image/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('C:/Users/user/Desktop/CYPERTS/FILES/GITHUB_CODES/GIT-Repo/14.did-registry-demo-dapp-main/node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-styled-components',
      plugin: require('C:/Users/user/Desktop/CYPERTS/FILES/GITHUB_CODES/GIT-Repo/14.did-registry-demo-dapp-main/node_modules/gatsby-plugin-styled-components/gatsby-ssr.js'),
      options: {"plugins":[],"displayName":true,"fileName":true,"minify":true,"namespace":"","transpileTemplateLiterals":true,"topLevelImportPaths":[],"pure":false,"disableVendorPrefixes":false},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('C:/Users/user/Desktop/CYPERTS/FILES/GITHUB_CODES/GIT-Repo/14.did-registry-demo-dapp-main/node_modules/gatsby-plugin-manifest/gatsby-ssr.js'),
      options: {"plugins":[],"name":"DID registry demo","short_name":"did-registry-demo","start_url":"/","background_color":"#FFFFFF","theme_color":"#FFFFFF","display":"minimal-ui","icon":"src/assets/images/logo.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"085130fa16989fb0def5de7d5c1f6413"},
    },{
      name: 'default-site-plugin',
      plugin: require('C:/Users/user/Desktop/CYPERTS/FILES/GITHUB_CODES/GIT-Repo/14.did-registry-demo-dapp-main/gatsby-ssr.tsx'),
      options: {"plugins":[]},
    },{
      name: 'partytown',
      plugin: require('C:/Users/user/Desktop/CYPERTS/FILES/GITHUB_CODES/GIT-Repo/14.did-registry-demo-dapp-main/node_modules/gatsby/dist/internal-plugins/partytown/gatsby-ssr.js'),
      options: {"plugins":[]},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
