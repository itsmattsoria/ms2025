# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 🎨 Custom Emoji Shortcodes

This site includes a global shortcode replacement system that converts text shortcodes into inline images during the build process.

### Usage

Simply type shortcodes anywhere in your content - templates, CMS content, anywhere! No function calls or special syntax required.

**Supported Shortcodes:**
- `:horns:` - Horns emoji
- `:heart:` - Heart emoji
- `:wave:` - Wave emoji
- `:sunglasses:` - Sunglasses emoji
- `:peace:` - Peace emoji

**Example:**

```html
<p>Hello :wave: from me :horns:</p>
```

Becomes:

```html
<p>Hello <img src="/images/emoji/wave.png" alt="wave emoji" class="custom-emoji" /> from me <img src="/images/emoji/horns.png" alt="horns emoji" class="custom-emoji" /></p>
```

### How It Works

The system uses an Astro integration that automatically processes all HTML output during the build. The replacement happens globally across:
- Static template content
- CMS-fetched content
- Any rendered HTML

**Note:** In development mode, shortcodes appear as plain text (e.g., `:horns:`). They are automatically converted to images when you build for production.

### Adding New Shortcodes

To add new emoji shortcodes:

1. Add your image file to `/public/images/emoji/`
2. Update the `SHORTCODE_MAP` in [`src/utils/shortcodeReplacer.ts`](src/utils/shortcodeReplacer.ts):

```typescript
{
  shortcode: ':smile:',
  imagePath: '/images/emoji/smile.png',
  alt: 'smile emoji',
}
```

### Styling

All emoji images are rendered with the class `custom-emoji` for consistent styling (defined in [`src/styles/components.css`](src/styles/components.css)).

