"use client"

type PrivacyPolicyPageProps = {
  onAgree: () => void
}

const PrivacyPolicyPage = ({
  onAgree,
}: PrivacyPolicyPageProps) => {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center">


      <div className="w-full bg-primary text-primary-foreground py-8">
        <div className=" flex flex-col items-center justify-center text-center space-y-3">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Data Privacy Policy
            </h1>

            <p className="text-sm  text-white">
              Republic Act 10173 - Data Privacy Act of 2012
            </p>
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-5xl px-4 py-10">

        <div className="rounded-2xl border bg-background shadow-sm">

          {/* Top Label */}
          <div className="border-b px-6 py-4">
            <span className="text-sm font-medium text-primary">
              Privacy Notice
            </span>
          </div>

          <div className="space-y-8 p-6">

            {/* Section 1 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />

                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Quality Policy
                </h2>
              </div>

              <p className="text-sm leading-7 text-muted-foreground">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, eveniet nam? Quos quod cumque atque ducimus? Ex, odit reprehenderit nobis sint aliquid ad quos aut dignissimos deleniti at quas odio.
                Quaerat officiis temporibus nisi quis libero, inventore odit laborum voluptates asperiores tempora doloremque quae eligendi neque quia tempore eos saepe explicabo, accusamus, autem itaque accusantium debitis animi natus. Sed, aut.
                Facilis eveniet fugit asperiores accusamus aperiam voluptatem, aspernatur temporibus sunt architecto officiis cumque qui sit ipsa id fuga magni suscipit consequuntur deserunt quasi reiciendis. Maiores laudantium cumque quos nemo sint!
                Voluptas, hic? Libero neque voluptates a aut qui sunt id vel magni architecto, laudantium nulla quo molestiae blanditiis nostrum nisi dignissimos! Dignissimos aliquid soluta officiis aut molestiae? Nostrum, earum corrupti.
              </p>
            </section>

            {/* Divider */}
            <div className="border-t" />

            {/* Section 2 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />

                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  What Information We Collect and How
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-muted-foreground">

                <div>
                  <span className="font-semibold text-foreground">
                    Personal details —
                  </span>{" "}
                  Any personal details you knowingly provide such as your
                  name, contact information, academic records, and other
                  relevant information.
                </div>

                <div>
                  <span className="font-semibold text-foreground">
                    IP Address —
                  </span>{" "}
                  This is a string of numbers unique to your computer which
                  is recorded by our web server when you request any page.
                </div>

                <div>
                  <span className="font-semibold text-foreground">
                    Preferred settings —
                  </span>{" "}
                  The website may store browser preferences and session
                  information to improve your experience.
                </div>

              </div>
            </section>

            {/* Divider */}
            <div className="border-t" />

            {/* Section 3 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />

                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  How We Use Your Information
                </h2>
              </div>

              <div className="space-y-4 text-sm leading-7 text-muted-foreground">

                <p>
                  Any personal information we collect from this website will
                  be used in accordance with the Republic Act 10173 —
                  Data Privacy Act of 2012 and other applicable laws.
                </p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Processing your requests and applications.
                  </li>

                  <li>
                    Monitoring website usage to improve services and
                    performance.
                  </li>

                  <li>
                    Sharing information only with authorized personnel when
                    necessary.
                  </li>
                </ul>

              </div>
            </section>

            {/* Divider */}
            <div className="border-t" />

            {/* Section 4 */}
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />

                <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Your Rights
                </h2>
              </div>

              <p className="text-sm leading-7 text-muted-foreground">
                You have the right to request access to your personal
                information, request corrections, and inquire about how your
                information is being used and protected.
              </p>
            </section>

            {/* Agreement Box */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm leading-6 text-primary">
                By clicking{" "}
                <span className="font-semibold">
                  &quot;I Have Read and Agreed&quot;
                </span>
                , you acknowledge that you have read, understood,
                and consent to this Data Privacy Policy.
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-xs text-muted-foreground">
                Your data is protected under RA 10173
              </p>

          
                <button  onClick={onAgree} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
                    I Have Read and Agreed
                </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage