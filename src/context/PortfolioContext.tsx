
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getPortfolioData } from "../lib/portfolioService";

type PortfolioData = Awaited<
  ReturnType<typeof getPortfolioData>
>;

interface PortfolioContextType {
  portfolio: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<
  PortfolioContextType | undefined
>(undefined);

export function PortfolioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [portfolio, setPortfolio] =
    useState<PortfolioData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await getPortfolioData();
        setPortfolio(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load portfolio data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{ portfolio, loading, error }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (!context) {
    throw new Error(
      "usePortfolio must be used inside PortfolioProvider"
    );
  }

  return context;
}
