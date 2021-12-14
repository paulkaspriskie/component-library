import React, { lazy, useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
const fileImporter = (file) => lazy(() => import(`./components/${file}`));


/**
 * 0. Main React component: App
 * 1. Includes Nav and Main elements.
 */
function App({inventory}) {

  let location = useLocation(),
      elementPath = location.pathname.split('/')[1];

  const [comp, setComp] = useState([]);


  useEffect(() => {
    /**
     * 0. Invokes async Loader() function, dynamically imports and renders components by pathname.
     * 1. Condition that invokes loader() when not at site root (/).
     * 2. Performs filter array on json object against pathname value.
     * 3. Calls function fileImporter() with elementPath value as argument to import corresponding component.
     * 4. Returns JSX component with name specified by component path.
     */
    if(elementPath !== '') {  /* [1] */

      (async function loader() {
        const componentPromises = getData();
        Promise.all(componentPromises).then(setComp);

        function getData() {
          return inventory.data.filter(val => val.name === elementPath).map(async (item, i) => {  /* [2] */
            const Element = await fileImporter(elementPath);  /* [3] */
            return <Element key={i} />  /* [4] */
          });
        }
      })();

    } // Closing of Condition (elementPath !== '')

  // Closing of useEffect()
  }, [location]);


  return (
    <div className="layout__app--container">
      <nav>
        <ul>
          { inventory.data ? inventory.data.map((item, i) => {
            return <li key={i}><Link to={'/' + item.name}>{item.name}</Link></li>
          }) : null }
        </ul>
      </nav>
      <main>
        <Routes>
          <Route
              path="/:type"
              element={
                <React.Suspense fallback='Loading...'>
                  {comp}
                </React.Suspense>
              }
            />
        </Routes>
      </main>
    </div>
  );
}

export default App;
