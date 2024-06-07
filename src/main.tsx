import ReactDOM from 'react-dom/client'
import './index.css'
import AppRoutes from './router'

const mainCss: string = "bg-gradient-to-r from-slate-900 to-slate-700"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <main className={mainCss}>
    <AppRoutes/>
  </main>
)

