import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Section } from '@/components/ui/section'
import { H1, H2, H3, Body, Small } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useI18n } from '@/client/lib/i18n'
import { getFormTrackingData } from '@/client/lib/use-tracking'
import { cn } from '@/lib/utils'
import { SEO, BreadcrumbSchema, WebPageSchema } from '@/components/seo'

const SITE_URL = 'https://br.luluwaldhund.de'

const createContactSchema = (t: ReturnType<typeof useI18n>['t']) =>
  z.object({
    name: z.string().min(1, t.form.required),
    company: z.string().min(1, t.form.required),
    email: z.string().min(1, t.form.required).email(t.form.invalidEmail),
    phone: z.string().optional(),
    interest: z.string().min(1, t.form.required),
    message: z.string().min(1, t.form.required),
    privacy: z.boolean().refine((val) => val === true, {
      message: t.form.required,
    }),
    marketingConsent: z.boolean().optional(),
  })

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>

export function ContactPage() {
  const { t, locale } = useI18n()
  const [searchParams] = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Valid interest options for URL parameter pre-selection
  const validInterests = ['discoveryDay', 'pilot', 'partnership', 'investment', 'general']

  const schema = createContactSchema(t)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      interest: '',
      message: '',
      privacy: false,
      marketingConsent: false,
    },
  })

  // Pre-select interest from URL query parameter
  useEffect(() => {
    const interestParam = searchParams.get('interest')
    if (interestParam && validInterests.includes(interestParam)) {
      setValue('interest', interestParam)
    }
  }, [searchParams, setValue])

  const interestValue = watch('interest')
  const privacyValue = watch('privacy')
  const marketingConsentValue = watch('marketingConsent')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Collect tracking data
      const trackingData = getFormTrackingData('contact')

      // Combine form data with tracking data
      const payload = {
        ...data,
        ...trackingData,
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Form submission error:', errorData)
        setSubmitStatus('error')
        return
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const interestOptions = [
    { value: 'discoveryDay', label: t.form.interestOptions.discoveryDay },
    { value: 'pilot', label: t.form.interestOptions.pilot },
    { value: 'partnership', label: t.form.interestOptions.partnership },
    { value: 'investment', label: t.form.interestOptions.investment },
    { value: 'general', label: t.form.interestOptions.general },
  ]

  const breadcrumbs = [
    { name: locale === 'de' ? 'Startseite' : 'Home', url: SITE_URL },
    { name: t.contact.title, url: `${SITE_URL}${locale === 'de' ? '/kontakt' : '/en/contact'}` },
  ]

  return (
    <>
      <SEO
        title={t.seo.contact.title}
        description={t.seo.contact.description}
      />
      <WebPageSchema
        title={t.seo.contact.title}
        description={t.seo.contact.description}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Header */}
      <Section className="pt-20 sm:pt-24 lg:pt-32 pb-12">
        <H1 className="mb-6">{t.contact.title}</H1>
        <Body className="max-w-2xl text-lg text-muted-foreground">
          {t.contact.intro}
        </Body>
      </Section>

      <Divider variant="blueprint" className="mx-auto max-w-5xl" />

      {/* Form and Discovery Day */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {t.form.name} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register('name')}
                    className={cn(errors.name && 'border-destructive')}
                  />
                  {errors.name && (
                    <Small className="text-destructive">{errors.name.message}</Small>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    {t.form.company} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="company"
                    {...register('company')}
                    className={cn(errors.company && 'border-destructive')}
                  />
                  {errors.company && (
                    <Small className="text-destructive">{errors.company.message}</Small>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t.form.email} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={cn(errors.email && 'border-destructive')}
                  />
                  {errors.email && (
                    <Small className="text-destructive">{errors.email.message}</Small>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t.form.phone}</Label>
                  <Input id="phone" type="tel" {...register('phone')} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">
                  {t.form.interest} <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={interestValue}
                  onValueChange={(value) => setValue('interest', value)}
                >
                  <SelectTrigger className={cn(errors.interest && 'border-destructive')}>
                    <SelectValue placeholder={t.form.selectOption} />
                  </SelectTrigger>
                  <SelectContent>
                    {interestOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.interest && (
                  <Small className="text-destructive">{errors.interest.message}</Small>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  {t.form.message} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  className={cn(errors.message && 'border-destructive')}
                  rows={5}
                />
                {errors.message && (
                  <Small className="text-destructive">{errors.message.message}</Small>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={privacyValue}
                      onCheckedChange={(checked) => setValue('privacy', checked === true)}
                      className={cn(errors.privacy && 'border-destructive')}
                    />
                    <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                      {t.form.privacyConsent} <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  {errors.privacy && (
                    <Small className="text-destructive">{errors.privacy.message}</Small>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="marketingConsent"
                    checked={marketingConsentValue}
                    onCheckedChange={(checked) => setValue('marketingConsent', checked === true)}
                  />
                  <Label htmlFor="marketingConsent" className="text-sm leading-relaxed cursor-pointer text-muted-foreground">
                    {t.form.marketingConsent}
                  </Label>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="rounded-md bg-green-50 border border-green-200 p-4">
                  <Body className="text-green-800 text-sm">{t.form.success}</Body>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4">
                  <Body className="text-destructive text-sm">{t.form.error}</Body>
                </div>
              )}

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? t.form.sending : t.buttons.sendMessage}
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Discovery Day Card */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>{t.contact.discoveryDay.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Body className="text-sm text-muted-foreground">
                  {t.contact.discoveryDay.description}
                </Body>
                <Small className="text-muted-foreground pt-2">
                  {t.contact.discoveryDay.includes}
                </Small>
              </CardContent>
            </Card>

            {/* Direct Contact */}
            <div className="space-y-4">
              <H3>{t.contact.directContact.title}</H3>
              <div className="space-y-3">
                <div>
                  <Small className="text-muted-foreground">{t.form.email}</Small>
                  <Body className="text-sm">
                    <a
                      href={`mailto:${t.contact.directContact.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {t.contact.directContact.email}
                    </a>
                  </Body>
                </div>
                <div>
                  <Small className="text-muted-foreground">{t.form.phone}</Small>
                  <Body className="text-sm">
                    <a
                      href={`tel:${t.contact.directContact.phone.replace(/\s/g, '')}`}
                      className="hover:text-primary transition-colors"
                    >
                      {t.contact.directContact.phone}
                    </a>
                  </Body>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
