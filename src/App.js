import logo from './logo.svg';
import './App.css';
import AdminUI from './components/AdminUI';
import Footer from './components/Footer';
export const config = {
  endpoint: `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`,
};


function App() {
  return (
    <div className="App">
    <AdminUI/>
    {/* <Footer/> */}
    </div>
  );
}

export default App;
