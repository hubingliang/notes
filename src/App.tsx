import './App.css'

import "animate.css"
import 'antd/dist/antd.css'
import { CSSCenterFlex } from './components/notes'
import { Page } from './components'


export const Content: React.FC = ({ children }) => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      ...CSSCenterFlex(),
    }}>
      {children}
    </div>
  )
}

const Header: React.FC = () => {
  return (
    <div style={{
      fontFamily: 'Centaur',
      fontStyle: 'oblique',
      fontSize: '48px',
      color: '#397BBE',
      marginBottom: '12px',
    }}>
      <span>la nota</span>
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <Content>
        <Header />
        <Page />
      </Content>
    </div>
  )
}

export default App
