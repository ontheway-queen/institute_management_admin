# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

//

1.searchParams.toString() // gives all query in a string
2.setSearchParams({ brand: ['nike', 'reebok'] }); multile brand name item set, brand=nike&brand=reebook,
3.setSearchParams(step1Filters) && setSearchParams({
pickAndDropFilter: '1',
step: '1',
meetAndAssistFilter: '1',
amenities: '1',
baggageWrapping: '1',
})

4.  useEffect(() => {
    // Convert all query params to an object
    const queryObject: Record<string, string> = {
    pickAndDropFilter: '1',
    step: '1',
    meetAndAssistFilter: '1',
    amenities: '1',
    baggageWrapping: '1',
    };
    for (const [key, value] of searchParams?.entries()) {
    queryObject[key] = value;
    }
    setSearchParams({
    ...queryObject,
    });
    console.log(
    'All query params:',
    queryObject,
    queryObject.toString(),
    searchParams.toString()
    );
    }, [searchParams]);

    Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

# initial-project-setup
