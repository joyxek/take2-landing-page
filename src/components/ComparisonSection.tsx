export default function ComparisonSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-accent-blue/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-instrument font-bold text-primary mb-4">
            Take2 is NOT a dating app
          </h2>
          <p className="text-xl font-carlita text-neutral-600 max-w-3xl mx-auto">
            See how we&apos;re different from everything you&apos;ve tried before
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Dating Apps Card */}
          <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-lg">
            <div className="flex items-center mb-6">
              <span className="text-red-500 text-2xl mr-3">✗</span>
              <h3 className="text-2xl font-instrument font-bold text-primary">
                Dating Apps
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="font-carlita text-neutral-700">Photo-forward: Success depends on your profile + pictures</p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="font-carlita text-neutral-700">Texting limbo: Endless messaging before meeting IRL</p>
              </div>
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="font-carlita text-neutral-700">You plan it all: Finding time, picking a place, handling logistics</p>
              </div>
            </div>
          </div>

          {/* Take2 Card */}
          <div className="bg-gradient-to-br from-accent-green/10 to-accent-blue/10 rounded-2xl p-8 border border-accent-green/20 shadow-xl">
            <div className="flex items-center mb-6">
              <span className="text-accent-green text-2xl mr-3">✓</span>
              <h3 className="text-2xl font-instrument font-bold text-primary">
                Take2
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/80 border border-accent-green/20">
                <p className="font-carlita text-neutral-700">One form, done: Simple application instead of curating a perfect profile</p>
              </div>
              <div className="p-4 rounded-lg bg-white/80 border border-accent-green/20">
                <p className="font-carlita text-neutral-700">IRL first: Skip texting games and go straight to face-to-face connections</p>
              </div>
              <div className="p-4 rounded-lg bg-white/80 border border-accent-green/20">
                <p className="font-carlita text-neutral-700">Zero logistics stress: We set the time, venue, and gather the group</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
