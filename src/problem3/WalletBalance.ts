// missing imports
import React, { useEffect, useMemo, useState } from 'react';


interface WalletBalance {
    currency: string;
    blockchain: string; // added as program references WalletBalance.blockchain
    amount: number;
  }
  /* Removed for redundancy
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  } */
  
  class Datasource {
    private apiUrl: string;
  
    constructor(apiUrl: string) {
      // object takes a URL (to be used as an API)
      this.apiUrl = apiUrl;
    }
  
    async getPrices(): Promise<{ [currency: string]: number }> {
      try {
        const response = await fetch(this.apiUrl);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${this.apiUrl}`);
        }
  
        const data = await response.json();
  
        // Assuming the response is an object with currency prices, e.g., { USD: 1, EUR: 0.85, ... }
        return data;
      } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
      }
    }
  }
  
  export default Datasource;
  
  interface BoxProps{

  }

  interface Props extends BoxProps {
  
  }

  const WalletPage: React.FC<Props> = (props: Props) => { 
    const { children, ...rest } = props;
    const balances = useWalletBalances();
      const [prices, setPrices] = useState({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then(prices => {
        setPrices(prices);
      }).catch(error => {
        
        console.error(error); // fix typo: console.err(error); -> console.error(error);
      });
    }, [time_period]); // as the dependencies list is empty, the useEffect() hook will only run once after the initial render, added time dependency so that the price will be updated frequently.
  

      // as we are using typescript it would be good practice to provide explicit type annotations
      // I would assume that it is a string considering the switch statement below (any -> String).
      const getPriority = (blockchain: string): number => {
        // arbitary numbers are being used to determine priority (without any explanation)
        // improve by defining named constants or comments.
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            // Fixed lhsPriority -> balancePriority
            if (balancePriority > -99) {
               if (balance.amount <= 0) {
                 return false; // true and false are swapped, you do not want non-blockchain / balance.amount <= 0 
               }
            }
            return true; // missing semicolon
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority >= rightPriority) { // changed > to >= for a complete comparison function
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
      });
    }, [balances, prices]);
  
    /* // redundancy from creating formattedBalances which can be achieved in the const rows function. 
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(); // missing semicolon
      }
    }) */
  
    const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      const formattedAmount = balance.amount.toFixed(); // missing semicolon
      return (
        <WalletRow // import an interface for WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }