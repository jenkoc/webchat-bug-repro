import React from 'react'
import ReactWebChat, {
  Components,
  createDirectLine,
  createStore,
  hooks,
} from "botframework-webchat";


function App() {
  const [token, setToken] =  React.useState<string>()

  React.useEffect(() => {
    (async () => {
      const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', { method: 'POST' });
      const { token } = await res.json();
      setToken(token)
    })()
  }, [setToken])

  const directLine = React.useMemo(
    () =>
      createDirectLine({
        token: token,
      }),
    [token]
  );

  const store = React.useMemo(
    () =>
    // @ts-ignore
      createStore({}, ({ dispatch }) => (next) => (action) => {
        return next(action);
      }),
    []
  );

  return (
      <Components.Composer
        directLine={directLine}
        store={store}
      >
        <Components.BasicWebChat />
      </Components.Composer>
  );
}

export default App;
