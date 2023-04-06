import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const providers = [
  {
    name: "Railway",
    url: "https://railway.app/pricing",
    cpu: 10,
    memory: 10,
  },
  {
    name: "Hop.io",
    url: "https://hop.io/pricing",
    cpu: 12.96,
    memory: 2.1,
    storage: 0.15,
  },
  {
    name: "Fly.io",
    url: "https://fly.io/docs/about/pricing/#apps",
    cpu: 21,
    memory: 5,
    storage: 0.15,
  },
  {
    name: "AWS Fargate",
    url: "https://aws.amazon.com/fargate/pricing/",
    cpu: 29.56,
    memory: 3.24,
    storage: 0.08,
    notes:
      "AWS Fargate is meant to be run on-request. This is pricing for a long-running container. (730 hours/1 month)",
  },
  {
    name: "Heroku"
    url: "https://www.heroku.com/pricing"
    cpu: 12.5
    memory: 12.5
    notes: "Only available in very certain tiers. We recommend Hop over Heroku"
  }
];

export const Providers = ({
  cpus,
  ram,
  storage,
}: {
  cpus: number;
  ram: number;
  storage: number;
}) => {
  const [parent] = useAutoAnimate();
  const [sortedProviders, setSortedProviders] = useState(
    providers.sort((a, b) => {
      const aTotal =
        a.cpu * cpus + a.memory * ram + (a.storage ? a.storage * storage : 0);
      const bTotal =
        b.cpu * cpus + b.memory * ram + (b.storage ? b.storage * storage : 0);
      return aTotal - bTotal;
    })
  );
  useEffect(() => {
    setSortedProviders(
      providers.sort(
        (a, b) =>
          a.cpu * cpus +
          a.memory * ram +
          (a.storage ? a.storage * storage : 0) -
          (b.cpu * cpus + b.memory * ram) +
          (b.storage ? b.storage * storage : 0)
      )
    );
  }, [cpus, ram, storage]);
  return (
    <div ref={parent}>
      {sortedProviders.map((provider) => (
        <div
          key={provider.name}
          className="p-4 border shadow-md rounded-md mb-4 max-w-2xl"
        >
          <h2 className="text-lg font-semibold mb-2">{provider.name}</h2>
          <p>CPU: ${(provider.cpu * cpus).toFixed(2)}</p>
          <p>RAM: ${(provider.memory * ram).toFixed(2)}</p>
          <p>
            Storage:{" "}
            {provider.storage
              ? `$${(provider.storage * storage).toFixed(2)}`
              : "Storage not offered"}
          </p>
          <div className="border-b border-white my-2" />
          <p>
            Additional Notes:
            {provider.notes ? ` ${provider.notes}` : " None"}
          </p>
          <div className="mt-2" />
          <p>
            Total:{" "}
            {provider.storage
              ? `$${(
                  provider.cpu * cpus +
                  provider.memory * ram +
                  provider.storage * storage
                ).toFixed(2)}`
              : `$${(provider.cpu * cpus + provider.memory * ram).toFixed(2)}`}
          </p>
          <div className="mt-2" />
          <a
            className=" text-blue-500 underline"
            href={provider.url}
            target="_blank"
          >
            Go to pricing
          </a>
        </div>
      ))}
    </div>
  );
};
