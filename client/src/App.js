import './App.css';
import RootLayout from './Components/Layout/RootLayout';
import { useState } from 'react';
import SignIn from './Components/SignIn';
function App() {

  const [auth, setAuth] = useState(false);

  return (
    <>
      {
        auth ?

          (<RootLayout>
            <div div className="App" >
              <p className='text-3xl dark:bg-green-50' >Hello</p>
            </div>
          </RootLayout >)
          : <SignIn setAuth={setAuth} />
      }
    </>
  );
}

export default App;
