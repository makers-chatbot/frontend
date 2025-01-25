import { Route, Routes } from "react-router-dom"
import { AuthLayout, ContractLayout, HomeLayout, ProductLayout } from "./layout"

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Routes>
        <Route path="/*" element={<HomeLayout />} />
        <Route path="/products/*" element={<ProductLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/contracts/*" element={<ContractLayout />} />
      </Routes>
    </div>
  )
}

export default App
