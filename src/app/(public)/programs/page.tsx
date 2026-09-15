import {
    ArrowRight,
    GraduationCap,
    School,
  } from "lucide-react"
import Link from "next/link"
  
  const ProgramsPage = () => {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br bg-[var(--primary)] text-white">
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <header className="relative z-10 flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white">
              <img
                src="images/nsc-logoo.png"
                alt="NSC Logo"
                className=""
              />
            </div>
  
            <div>
              <h1 className="text-lg font-bold">NSC</h1>
              <p className="text-sm text-white/60">
                Admission Portal
              </p>
            </div>
          </div>
  
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300 md:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Enrollment Open
            </div>
  
            <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              A.Y. 2026–2027
            </div>
          </div>
        </header>
  
        <main className="relative z-10 flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-16">
          <div className="w-full max-w-6xl">
  
            <div className="mb-8 text-center">
              <h1 className="text-5xl font-black tracking-tight md:text-7xl">
                Choose Your
                <span className="block bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent">
                  Academic Path
                </span>
              </h1>
  
              <p className="mx-auto mt-6 max-w-2xl text-base text-white/65 md:text-lg">
                Select your preferred academic category to continue your admission journey.
              </p>
            </div>
  
            <div className="grid gap-6 lg:grid-cols-2">
            <Link href="/registration">
                <button 
              className="
                group relative overflow-hidden rounded-3xl border border-white/10
                bg-white/5 p-8 text-left backdrop-blur-xl
                transition-all duration-300 hover:border-emerald-400/30
                hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-500/10
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative space-y-6">
                <div className="flex items-center justify-between gap-6">

                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                      <GraduationCap className="h-8 w-8 text-emerald-300" />
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold">
                        Colleges
                      </h2>

                      <p className="mt-1 text-white/60">
                        Undergraduate Programs
                      </p>
                    </div>
                  </div>

                </div>

                <p className="max-w-xl text-white/60">
                  Apply for undergraduate and higher education programs across different colleges and departments.
                </p>

                <div className="flex justify-end">
                  <div className="flex items-center gap-3 text-emerald-300 font-medium">
                    <span>Enroll Now</span>

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
                </button>
            </Link>


            <Link href="/registration">
              <button
                className="
                  group relative overflow-hidden rounded-3xl border border-white/10
                  bg-white/5 p-8 text-left backdrop-blur-xl
                  transition-all duration-300 hover:border-sky-400/30
                  hover:bg-white/10 hover:shadow-2xl hover:shadow-sky-500/10
                "
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10">
                        <School className="h-8 w-8 text-sky-300" />
                      </div>

                      <div>
                        <h2 className="text-3xl font-bold">
                          Basic Education
                        </h2>

                        <p className="mt-1 text-white/60">
                          K–12 Programs
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="max-w-xl text-white/60">
                    Enroll for elementary, junior high school, and senior high school academic programs.
                  </p>

                  <div className="flex justify-end">
                    <div className="flex items-center gap-3 text-sky-300 font-medium">
                      <span>Enroll Now</span>

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
            </button>
            </Link>
          
            </div>
          </div>
        </main>
      </div>
    )
  }
  
  export default ProgramsPage