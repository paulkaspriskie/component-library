
export default const testImporter = (file) => {
  return lazy(() => import(`./components/${file}`));
}
