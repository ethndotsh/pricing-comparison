import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Providers } from "@/components/providers";

export default function Home() {
  const [cpus, setCpus] = useState<number[]>([4]);
  const [ram, setRam] = useState<number[]>([8]);
  const [storage, setStorage] = useState<number[]>([100]);
  return (
    <main className="mt-12">
      <div className="flex justify-center text-center mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Hosting pricing comparison
          </h1>
          <p>Pricing is per month</p>

          <a
            href="https://github.com/cursecodes/pricing-comparison"
            className="font-medium"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-96">
          <div className="">
            <Slider
              step={1}
              max={16}
              min={0.5}
              value={cpus}
              onValueChange={setCpus}
              color="red"
            />
            <p className="font-mono mt-1 text-sm">
              {cpus} CPU{cpus[0] !== 1 ? "s" : undefined}
            </p>
          </div>
          <div className="mt-6">
            <Slider
              step={1}
              max={32}
              min={0.5}
              value={ram}
              onValueChange={setRam}
            />
            <p className="font-mono mt-1 text-sm">{ram} GB RAM</p>
          </div>
          <div className="mt-6 ">
            <Slider
              step={1}
              max={1024}
              min={0}
              value={storage}
              onValueChange={setStorage}
            />
            <p className="font-mono mt-1 text-sm">
              {storage[0] > 0 ? `${storage} GB Storage` : "No Storage"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Providers cpus={cpus[0]} ram={ram[0]} storage={storage[0]} />
      </div>
    </main>
  );
}
