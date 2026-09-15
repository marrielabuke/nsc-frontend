import VerifyEmailClient from "./verify-email-client"

type VerifyEmailPageProps = {
  searchParams: Promise<{ token?: string | string[] }>
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = await searchParams
  const token = Array.isArray(params.token) ? params.token[0] : params.token

  return <VerifyEmailClient token={token ?? ""} />
}
