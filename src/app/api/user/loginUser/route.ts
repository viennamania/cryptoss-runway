import { NextResponse, type NextRequest } from "next/server";

import {
	///getOneByWalletAddress,
} from '@lib/api/user';
import { use } from "react";



export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    storecode,
    memberid,
    password,
  } = body;

  //console.log("storecode", storecode);
  //console.log("walletAddress", walletAddress);

  /*
  console.log("getUser storecode", storecode);
  console.log("getUser walletAddress", walletAddress);


  const result = await getOneByWalletAddress(
    storecode,
    walletAddress
  );


 
  return NextResponse.json({

    result,
    
  });
  */
  console.log("storecode", storecode);
  console.log("memberid", memberid);
  console.log("password", password);

  /*
  if (memberid === 'abcd' && password === '1234') {
    return NextResponse.json({
      user: {
        storecode: storecode,
        nickname: 'Test User',
        walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
        depositBankName: 'Test Bank',
        depositBankAccountNumber: '123-456-7890',
        depositName: 'Test User',
      },
      message: 'Login successful',
    });
  } else {
    return NextResponse.json({
      error: 'Invalid member ID or password',
    }, { status: 401 });
  }
  */

  // call api
  const apiUrl = `${process.env.STABLE_API_URL}/api/user/loginUser`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storecode,
        memberid,
        password,
      }),
    });
    const data = await response.json();

    //console.log("API response:", data);

    /*
{
  result: {
    _id: '687a705dd8c7fba2f2d3bf9f',
    id: 8147818,
    email: null,
    nickname: 'test003',
    mobile: '+821012345678',
    storecode: 'ycvqgqgg',
    store: {
      _id: '686f96d99e177f33544151f7',
      agentcode: 'tteduies',
      storecode: 'ycvqgqgg',
      storeName: '타이틀',
      storeType: 'test',
      storeUrl: 'https://test.com',
      storeDescription: '결제 USDT',
      storeLogo: 'https://t0gqytzvlsa2lapo.public.blob.vercel-storage.com/Nxaim0R-yzWPpPhppAZB78IJci1banzVEFsL9k.jpeg',
      storeBanner: 'https://stable.makeup/logo.png',
      createdAt: '2025-07-10T10:32:57.712Z',
      storeMemo: '오프라인\n테더/현금 50:50\n타이틀 zaqa-pull2424.com /usdt / aa1234!@\n@scndnwo\n',
      backgroundColor: 'purple-500',
      adminWalletAddress: '0xa69db46CF977C16eC30CDDf9A9fBA415Fc35293b',
      settlementWalletAddress: '0xa69db46CF977C16eC30CDDf9A9fBA415Fc35293b',
      settlementFeeWalletAddress: '0x3f1e7D26A2704BE994aF84cEbf19BA9683E23666',
      settlementFeePercent: 0.5,
      agentFeePercent: 0.1,
      sellerWalletAddress: '0x3f1e7D26A2704BE994aF84cEbf19BA9683E23666',
      bankInfo: [Object],
      payactionKey: [Object],
      withdrawalBankInfo: [Object],
      totalBuyerCount: 5,
      totalKrwAmount: 1000,
      totalKrwAmountClearance: 0,
      totalPaymentConfirmedClearanceCount: 0,
      totalPaymentConfirmedCount: 1,
      totalUsdtAmount: 0.72,
      totalUsdtAmountClearance: 0,
      totalFeeAmount: 0.004,
      totalFeeAmountKRW: 6,
      totalSettlementAmount: 0.715,
      totalSettlementAmountKRW: 987,
      totalSettlementCount: 1
    },
    walletAddress: '0xf772137cb0d2Ade0DAcaEC79919942186D2C60aB',
    walletPrivateKey: '0x76a974b2749bb3a685da2e9d083d175596697a8c26379638fce4235119a535df',
    createdAt: '2025-07-18T16:03:41.103Z',
    settlementAmountOfFee: '0',
    password: '1234',
    buyer: {
      depositBankAccountNumber: '93274023',
      depositBankName: '경북은행',
      depositName: '테스트003'
    }
  }
}
        */



    
    return NextResponse.json({

      user: {
        storecode: data.result.storecode,
        nickname: data.result.nickname,
        walletAddress: data.result.walletAddress,
        depositBankName: data.result.buyer.depositBankName,
        depositBankAccountNumber: data.result.buyer.depositBankAccountNumber,
        depositName: data.result.buyer.depositName,
      },
      message: data.message || 'Login successful',
      error: data.error || null,

    });


  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }




  
}
