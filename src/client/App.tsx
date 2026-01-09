import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nProvider } from '@/client/lib/i18n'
import { PageLayout } from '@/components/layout/page-layout'
import {
  HomePage,
  AboutPage,
  SolutionsPage,
  ContactPage,
  NotFoundPage,
} from '@/client/pages'

function AppRoutes() {
  return (
    <PageLayout>
      <Routes>
        {/* German routes (default) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/uber-uns" element={<AboutPage />} />
        <Route path="/losungen" element={<SolutionsPage />} />
        <Route path="/kontakt" element={<ContactPage />} />

        {/* English routes */}
        <Route path="/en" element={<HomePage />} />
        <Route path="/en/about" element={<AboutPage />} />
        <Route path="/en/solutions" element={<SolutionsPage />} />
        <Route path="/en/contact" element={<ContactPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </PageLayout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AppRoutes />
      </I18nProvider>
    </BrowserRouter>
  )
}
