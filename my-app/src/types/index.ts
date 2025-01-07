export interface Auction {
    id: string;
    title: string;
    description: string;
    startPrice: number;
    startDate: Date;
    endDate: Date;
    minIncr: number;
    ActualBid: number;
    FinishedBid: number;
    winnerId?: string;
  }
  
  export interface Bid {
    id: string;
    userId: string;
    auctionId: string;
  }