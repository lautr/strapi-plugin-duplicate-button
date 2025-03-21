import pluginPkg from "../../package.json";
import DuplicateButton from "./components/DuplicateButton";
import Initializer from "./components/Initializer";
import pluginId from "./pluginId";
import prefixPluginTranslations from "./prefixPluginTranslations";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {
    app
      .getPlugin("content-manager")
      .injectComponent("editView", "right-links", {
        name: pluginId,
        Component: DuplicateButton,
      });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
