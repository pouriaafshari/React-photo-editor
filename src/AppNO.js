
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from './Editor'
import Login from "./Login";

export default function App()
{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

function Layout() {
  return (<div>Layout2</div>)
}
function Home() {
  return (<div>Home</div>)
}
function Blogs() {
  return (<div>Blogs</div>)
}
function Contact() {
  return (<div>Contact</div>)
}
function NoPage() {
  return (<div>Not a page</div>)
}
