'use client';

import { useState, useEffect, use, act } from "react";

import Image from "next/image";



// open modal

import Modal from '@/components/modal';

import { useRouter }from "next//navigation";


import { toast } from 'react-hot-toast';

import { client } from "../../../client";



import {
  getContract,
  sendAndConfirmTransaction,
  sendTransaction,
  waitForReceipt,
} from "thirdweb";



import {
  polygon,
  arbitrum,
} from "thirdweb/chains";

import {
  //ConnectButton,
  //useActiveAccount,
  //useActiveWallet,
  useWalletBalance,

  useSetActiveWallet,

  useConnectedWallets,


} from "thirdweb/react";

import {
  inAppWallet,
  createWallet,
} from "thirdweb/wallets";





import {
  getUserPhoneNumber,
  getUserEmail,
} from "thirdweb/wallets/in-app";


import { balanceOf, transfer } from "thirdweb/extensions/erc20";
import { add } from "thirdweb/extensions/farcaster/keyGateway";
 


import AppBarComponent from "@/components/Appbar/AppBar";
import { getDictionary } from "../../../dictionaries";
//import Chat from "@/components/Chat";
import { ClassNames } from "@emotion/react";


import useSound from 'use-sound';
import { it } from "node:test";
import { get } from "http";


import { useSearchParams } from 'next/navigation';





interface BuyOrder {
  _id: string;
  createdAt: string;
  walletAddress: string;
  nickname: string;
  avatar: string;
  trades: number;
  price: number;
  available: number;
  limit: string;
  paymentMethods: string[];

  usdtAmount: number;
  krwAmount: number;
  rate: number;



  seller: any;

  tradeId: string;
  status: string;
  acceptedAt: string;
  paymentRequestedAt: string;
  paymentConfirmedAt: string;
  cancelledAt: string;


  buyer: any;

  canceller: string;

  escrowTransactionHash: string;
  transactionHash: string;

  settlement: any;

  autoConfirmPayment: boolean;
  paymentAmount: number;

  storecode: string;
  store: any;

  agentName: string;
  agentcode: string;

  agent: any;
}


/*
const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "email",
        "x",
        "passkey",
        "phone",
        "facebook",
        "line",
        "apple",
        "coinbase",
      ],
    },
  }),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("io.metamask"),
  createWallet("com.bitget.web3"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),

];
*/

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
      ],
    },
  }),
];


// get escrow wallet address

//const escrowWalletAddress = "0x2111b6A49CbFf1C8Cc39d13250eF6bd4e1B59cF6";



const contractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"; // USDT on Polygon
const contractAddressArbitrum = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"; // USDT on Arbitrum




export default function Index({ params }: any) {

  const searchParams = useSearchParams();
 
  const paramMemberid = searchParams.get('memberid') || '';


  // limit, page number params

  const limit = searchParams.get('limit') || 10;
  const page = searchParams.get('page') || 1;



  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    
    
    chain: arbitrum,
  
  
  
    // the contract's address
    ///address: contractAddressArbitrum,

    address: contractAddressArbitrum,


    // OPTIONAL: the contract's abi
    //abi: [...],
  });


 
  //const activeWallet = useActiveWallet();




  const [data, setData] = useState({
    title: "",
    description: "",

    menu : {
      buy: "",
      sell: "",
      trade: "",
      chat: "",
      history: "",
      settings: "",
    },

    Go_Home: "",
    Buy: "",
    Sell: "",
    Amount: "",
    Price: "",
    Total: "",
    Orders: "",
    Trades: "",
    Search_my_trades: "",

    Anonymous: "",

    Seller: "",
    Buyer: "",
    Me: "",

    Buy_USDT: "",
    Rate: "",
    Payment: "",
    Bank_Transfer: "",

    I_agree_to_the_terms_of_trade: "",
    I_agree_to_cancel_the_trade: "",

    Opened_at: "",
    Cancelled_at: "",
    Completed_at: "",


    Opened: "",
    Completed: "",
    Cancelled: "",


    Waiting_for_seller_to_deposit: "",

    to_escrow: "",
    If_the_seller_does_not_deposit_the_USDT_to_escrow: "",
    this_trade_will_be_cancelled_in: "",

    Cancel_My_Trade: "",


    Order_accepted_successfully: "",
    Order_has_been_cancelled: "",
    My_Order: "",

    hours: "",
    minutes: "",
    seconds: "",

    hours_ago: "",
    minutes_ago: "",
    seconds_ago: "",

    Order_Opened: "",
    Trade_Started: "",
    Expires_in: "",

    Accepting_Order: "",

    Escrow: "",

    Chat_with_Seller: "",
    Chat_with_Buyer: "",

    Table_View: "",

    TID: "",

    Status: "",

    Sell_USDT: "",

    Buy_Order_Opened: "",
  
    Insufficient_balance: "",


    Request_Payment: "",

    Payment_has_been_confirmed: "",

    Confirm_Payment: "",

    Escrow_Completed: "",

    Buy_Order_Accept: "",

    Payment_Amount: "",

    Buy_Amount: "",

    Deposit_Name: "",

    My_Balance: "",

    Make_Escrow_Wallet: "",
    Escrow_Wallet_Address_has_been_created: "",
    Failed_to_create_Escrow_Wallet_Address: "",

    Newest_order_has_been_arrived: "",
    Payment_request_has_been_sent: "",
    Escrow_balance_is_less_than_payment_amount: "",

    Copied_Wallet_Address: "",


  } );

  useEffect(() => {
      async function fetchData() {
          const dictionary = await getDictionary(params.lang);
          setData(dictionary);
      }
      fetchData();
  }, [params.lang]);

  const {
    title,
    description,
    menu,
    Go_Home,
    Buy,
    Sell,
    Amount,
    Price,
    Total,
    Orders,
    Trades,
    Search_my_trades,

    Anonymous,

    Seller,
    Buyer,
    Me,

    Buy_USDT,
    Rate,
    Payment,
    Bank_Transfer,
    I_agree_to_the_terms_of_trade,
    I_agree_to_cancel_the_trade,

    Opened_at,
    Cancelled_at,
    Completed_at,

    Opened,
    Completed,
    Cancelled,

    Waiting_for_seller_to_deposit,

    to_escrow,

    If_the_seller_does_not_deposit_the_USDT_to_escrow,
    this_trade_will_be_cancelled_in,

    Cancel_My_Trade,

    Order_accepted_successfully,
    Order_has_been_cancelled,
    My_Order,

    hours,
    minutes,
    seconds,

    hours_ago,
    minutes_ago,
    seconds_ago,

    Order_Opened,
    Trade_Started,
    Expires_in,

    Accepting_Order,

    Escrow,

    Chat_with_Seller,
    Chat_with_Buyer,

    Table_View,

    TID,

    Status,

    Sell_USDT,

    Buy_Order_Opened,

    Insufficient_balance,

    Request_Payment,

    Payment_has_been_confirmed,

    Confirm_Payment,

    Escrow_Completed,

    Buy_Order_Accept,

    Payment_Amount,

    Buy_Amount,

    Deposit_Name,

    My_Balance,

    Make_Escrow_Wallet,
    Escrow_Wallet_Address_has_been_created,
    Failed_to_create_Escrow_Wallet_Address,

    Newest_order_has_been_arrived,
    Payment_request_has_been_sent,
    Escrow_balance_is_less_than_payment_amount,

    Copied_Wallet_Address,

  } = data;




  const router = useRouter();


  
  const [userLogin, setUserLogin] = useState(false);
  const [memberid, setMemberid] = useState(paramMemberid || '');
  const [userPassword, setUserPassword] = useState('1234');
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [depositBankName, setDepositBankName] = useState('');
  const [depositBankAccountNumber, setDepositBankAccountNumber] = useState('');
  const [depositName, setDepositName] = useState('');


  const loginUser = async () => {
    if (!memberid) {
      toast.error('회원아이디를 입력해주세요');
      return;
    }
    if (!userPassword) {
      toast.error('비밀번호를 입력해주세요');
      return;
    }
    const mobile = '010-1234-5678';

    try {
      setUserLogin(true);
      const response = await fetch('/api/user/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storecode: params.center,
          memberid: memberid,
          password: userPassword,
        }),
      });
      const data = await response?.json();
      console.log('userLogin data', data);

      if (data.user) {
        
        setAddress(data.user.walletAddress);

        setNickname(data.user.nickname);

        setDepositBankName(data.user.depositBankName);
        setDepositBankAccountNumber(data.user.depositBankAccountNumber);
        setDepositName(data.user.depositName);

        setUser(data.user);

        toast.success('로그인 성공');
      } else {
        toast.error('로그인 실패');
      }
    } catch (error) {
      console.error('userLogin error', error);
      toast.error('로그인 실패');
    } finally {

      setUserLogin(false);
    }
  }

  useEffect(() => {

    loginUser();

  }, [memberid, userPassword, params.center]);



  const [nativeBalance, setNativeBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {

    // get the balance
    const getBalance = async () => {

      ///console.log('getBalance address', address);

      
      const result = await balanceOf({
        contract,
        address: address || "",
      });

  
      //console.log(result);
  
      setBalance( Number(result) / 10 ** 6 );


      /*
      await fetch('/api/user/getBalanceByWalletAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chain: params.center,
          walletAddress: address,
        }),
      })

      .then(response => response.json())

      .then(data => {
          setNativeBalance(data.result?.displayValue);
      });
      */



    };


    if (address) getBalance();

    const interval = setInterval(() => {
      if (address) getBalance();
    } , 5000);

    return () => clearInterval(interval);

  } , [address, contract]);










  

  // get User by wallet address
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);





  /*
  useEffect(() => {

    if (!address) {

      setUser(null);
      return;
    }

    setLoadingUser(true);

    fetch('/api/user/getUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storecode: params.center,
            walletAddress: address,
        }),
    })
    .then(response => response.json())
    .then(data => {
        
        /////console.log('data.result', data.result);


        setUser(data.result);

        setEscrowWalletAddress(data.result.escrowWalletAddress);

        setIsAdmin(data.result?.role === "admin");

    })
    .catch((error) => {
        console.error('Error:', error);
        setUser(null);
        setEscrowWalletAddress('');
        setIsAdmin(false);
    });

    setLoadingUser(false);


  } , [address]);
  */
  


  const [isPlaying, setIsPlaying] = useState(false);
  //const [play, { stop }] = useSound(galaxySfx);
  const [play, { stop }] = useSound('/ding.mp3');

  function playSong() {
    setIsPlaying(true);
    play();
  }

  function stopSong() {
    setIsPlaying(false);
    stop();
  }






  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  


  const [searchMyOrders, setSearchMyOrders] = useState(false);




  // limit number
  const [limitValue, setLimitValue] = useState(limit || 20);
  useEffect(() => {
    setLimitValue(limit || 20);
  }, [limit]);

  // page number
  const [pageValue, setPageValue] = useState(page || 1);
  useEffect(() => {
    setPageValue(page || 1);
  }, [page]);
  



// search form date to date
  const [searchFromDate, setSearchFormDate] = useState("");
  // set today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    today.setHours(today.getHours() + 9); // Adjust for Korean timezone (UTC+9)


    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    setSearchFormDate(formattedDate);
  }, []);




  const [searchToDate, setSearchToDate] = useState("");

  // set today's date in YYYY-MM-DD format
  useEffect(() => {
    const today = new Date();
    today.setHours(today.getHours() + 9); // Adjust for Korean timezone (UTC+9)

    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    setSearchToDate(formattedDate);
  }, []);





  const [searchBuyer, setSearchBuyer] = useState("");

  const [searchDepositName, setSearchDepositName] = useState("");


  // search store bank account number
  const [searchStoreBankAccountNumber, setSearchStoreBankAccountNumber] = useState("");

  





  // limit number
  //const [limit, setLimit] = useState(20);

  // page number
  //const [page, setPage] = useState(1);


  const [totalCount, setTotalCount] = useState(0);
    
  const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([]);


  







  // transfer escrow balance to seller wallet address

  const [amountOfEscrowBalance, setAmountOfEscrowBalance] = useState("");

  const [transferingEscrowBalance, setTransferingEscrowBalance] = useState(false);






  const [latestBuyOrder, setLatestBuyOrder] = useState<BuyOrder | null>(null);


  useEffect(() => {


    const fetchBuyOrders = async () => {
      

      const response = await fetch('/api/order/getAllBuyOrders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(

            {
              storecode: params.center,
              limit: Number(limit),
              page: Number(page),
              walletAddress: address,
              searchMyOrders: searchMyOrders,

              searchBuyer: memberid,

              fromDate: searchFromDate,
              toDate: searchToDate,
            }

        ),
      });

      if (!response.ok) {
        return;
      }



      const data = await response.json();


      setBuyOrders(data.result.orders);

      setTotalCount(data.result.totalCount);
      


    }


    if (!address || !params.center || !searchFromDate || !searchToDate) {
      setBuyOrders([]);

      return;
    }

    fetchBuyOrders();

    
    
    const interval = setInterval(() => {

      fetchBuyOrders();


    }, 3000);


    return () => clearInterval(interval);
    
    
    
    


  } , [
    limit,
    page,
    address,
    searchMyOrders,


    latestBuyOrder,
    //playSong,

    limitValue,
    pageValue,

    params.center,
    searchFromDate,
    searchToDate,

    memberid,
]);


///console.log('agreementForTrade', agreementForTrade);


const [fetchingBuyOrders, setFetchingBuyOrders] = useState(false);

const fetchBuyOrders = async () => {


  if (fetchingBuyOrders) {
    return;
  }
  setFetchingBuyOrders(true);

  const response = await fetch('/api/order/getAllBuyOrders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        storecode: params.center,
        limit: Number(limitValue),
        page: Number(pageValue),
        walletAddress: address,
        searchMyOrders: searchMyOrders,

        searchOrderStatusCompleted: true,

        searchBuyer: searchBuyer,
        searchDepositName: searchDepositName,

        searchStoreBankAccountNumber: searchStoreBankAccountNumber,


        fromDate: searchFromDate,
        toDate: searchToDate,

      }

    ),
  });

  if (!response.ok) {
    setFetchingBuyOrders(false);
    toast.error('Failed to fetch buy orders');
    return;
  }
  const data = await response.json();
  //console.log('data', data);

  setBuyOrders(data.result.orders);
  setTotalCount(data.result.totalCount);
  setFetchingBuyOrders(false);

  return data.result.orders;
}




  


  // check table view or card view
  const [tableView, setTableView] = useState(true);




  const [storeCodeNumber, setStoreCodeNumber] = useState('');

  useEffect(() => {

    const fetchStoreCode = async () => {

      const response = await fetch('/api/order/getStoreCodeNumber', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      //console.log('getStoreCodeNumber data', data);

      setStoreCodeNumber(data?.storeCodeNumber);

    }

    fetchStoreCode();

  } , []);
    



      // array of stores
  const [storeList, setStoreList] = useState([] as any[]);


  const [storeAdminWalletAddress, setStoreAdminWalletAddress] = useState("");

  const [fetchingStore, setFetchingStore] = useState(false);
  const [store, setStore] = useState(null) as any;

  useEffect(() => {


    setFetchingStore(true);

    const fetchData = async () => {
        const response = await fetch("/api/store/getOneStore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              storecode: params.center,
              ////walletAddress: address,
            }),
        });

        const data = await response.json();

        //console.log("data", data);

        if (data.result) {

          setStore(data.result);

          setStoreAdminWalletAddress(data.result?.adminWalletAddress);

      } else {
        // get store list
        const response = await fetch("/api/store/getAllStores", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
          }),
        });
        const data = await response.json();
        //console.log("getStoreList data", data);
        setStoreList(data.result.stores);
        setStore(null);
        setStoreAdminWalletAddress("");
      }

        setFetchingStore(false);
    };

    if (!params.center) {
      return;
    }

    fetchData();

    // interval to fetch store data every 10 seconds
    const interval = setInterval(() => {
      fetchData();
    }
    , 5000);
    return () => clearInterval(interval);

  } , [params.center]);






  

  useEffect(() => {
    // Dynamically load the Binance widget script
    const script = document.createElement("script");
    script.src = "https://public.bnbstatic.com/unpkg/growth-widget/cryptoCurrencyWidget@0.0.20.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, [address, store]);




  if (fetchingStore) {
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">
        <div className="py-0 w-full flex flex-col items-center justify-center gap-4">

          <Image
            src="/banner-loading.gif"
            alt="Loading"
            width={200}
            height={200}
          />

          <div className="text-lg text-gray-500">가맹점 정보를 불러오는 중...</div>
        </div>
      </main>
    );
  }
  if (!fetchingStore && !store) {
    return (
      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">
        <div className="py-0 w-full flex flex-col items-center justify-center gap-4">
          <Image
            src="/banner-404.gif"
            alt="Error"
            width={200}
            height={200}
          />
          <div className="text-lg text-gray-500">가맹점 정보가 없습니다.</div>
          <div className="text-sm text-gray-400">가맹점 홈페이지로 이동해주세요.</div>

          {/* table of storeList */}
          {/* storeName, storeCode, storeLogo, goto center page */}
          
          <div className="w-full max-w-2xl">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">가맹점 이름</th>
                  <th className="px-4 py-2 text-left">가맹점 코드</th>
                  <th className="px-4 py-2 text-left">가맹점 로고</th>
                </tr>
              </thead>
              <tbody>
                {storeList.map((store) => (
                  <tr key={store.storecode} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{store.storeName}</td>
                    <td className="px-4 py-2">{store.storecode}</td>
                    <td className="px-4 py-2">
                      <Image
                        src={store.storeLogo || "/logo.png"}
                        alt={store.storeName}
                        width={100}
                        height={100}
                        className="rounded-lg w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => router.push('/' + params.lang + '/' + store.storecode + '/center')}
                        className="text-blue-500 hover:underline"
                      >
                        가맹점 페이지로 이동
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    );
  }


  if (!address) {
    return (
   <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">


      <div className="py-0 w-full">




        {params.center && (
              <div className={`w-full flex flex-row items-center justify-start gap-2
                p-2 rounded-lg mb-4
                ${store?.backgroundColor ?
                  "bg-" + store.backgroundColor + " " :
                  "bg-black/10"
                }`}>
                
              <div className="w-full flex flex-row items-center justify-start gap-2">
                <Image
                  src={store?.storeLogo || "/logo.png"}
                  alt="logo"
                  width={35}
                  height={35}
                  className="rounded-lg w-6 h-6"
                />
                {address && address === storeAdminWalletAddress && (
                  <div className="text-sm text-[#3167b4] font-bold">
                    {store?.storeName + " (" + store?.storecode + ") 가맹점 관리자"}
                  </div>
                )}
                {address && address !== storeAdminWalletAddress && (
                  <div className="text-sm text-[#3167b4] font-bold">
                    {store?.storeName + " (" + store?.storecode + ")"}
                  </div>
                )}

              </div>


              {address && !loadingUser && (


                <div className="w-full flex flex-row items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      router.push('/' + params.lang + '/' + params.center + '/profile-settings');
                    }}
                    className="flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                  >
                    {user?.nickname || "프로필"}
                  </button>


                </div>


              )}


            </div>
        )}


        <div className="w-full flex flex-col justify-between items-center gap-2 mb-5">
   

          <div className="w-full flex flex-row gap-2 justify-end items-center">


          {/* right space */}
          {/* background transparent */}
          <select
            //className="p-2 text-sm bg-zinc-800 text-white rounded"


            className="p-2 text-sm bg-transparent text-zinc-800 rounded"

            onChange={(e) => {
              const lang = e.target.value;
              router.push(
                "/" + lang + "/" + params.center + "/center"
              );
            }}
          >
            <option
              value="en"
              selected={params.lang === "en"}
            >
              English(US)
            </option>
            <option
              value="ko"
              selected={params.lang === "ko"}
            >
              한국어(KR)
            </option>
            <option
              value="zh"
              selected={params.lang === "zh"}
            >
              中文(ZH)
            </option>
            <option
              value="ja"
              selected={params.lang === "ja"}
            >
              日本語(JP)
            </option>
          </select>

          {/* icon-language */}
          {/* color is tone down */}
          <Image
            src="/icon-language.png"
            alt="Language"
            width={20}
            height={20}
            className="rounded-lg w-6 h-6
              opacity-50
              "
          />

          </div>

        </div>


      </div>

    </main>


    );
  }





    return (

      <main className="p-4 pb-10 min-h-[100vh] flex items-start justify-center container max-w-screen-2xl mx-auto">


        <div className="py-0 w-full">

          <div className={`w-full flex flex-col xl:flex-row items-center justify-between gap-2
            p-2 rounded-lg mb-4
            ${store?.backgroundColor ?
              "bg-" + store.backgroundColor + " " :
              "bg-black/10"
            }`}>
              
              
              <button
                onClick={() => {
                  router.push('/' + params.lang + '/' + params.center + '/center');
                }}
                className="flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
              >

                <div className="flex flex-row items-center gap-2">
                  <Image
                      src={store?.storeLogo || "/logo.png"}
                      alt="Store"
                      width={35}
                      height={35}
                      className="rounded-lg w-5 h-5"
                  />
                  <span className="text-sm text-zinc-50">
                    {
                      store && store?.storeName + " (" + store?.storecode + ")"
                    }
                  </span>
                  {address === storeAdminWalletAddress && (
                    <div className="flex flex-row gap-2 items-center">
                      <Image
                        src="/icon-manager.png"
                        alt="Store Admin"
                        width={20}
                        height={20}
                      />
                      <span className="text-sm text-zinc-50">
                        가맹점 관리자
                      </span>
                    </div>
                  )}
                  {isAdmin && (
                    <div className="flex flex-row items-center justify-center gap-2">
                      <Image
                        src="/icon-admin.png"
                        alt="Admin"
                        width={20}
                        height={20}
                        className="rounded-lg w-5 h-5"
                      />
                      <span className="text-sm text-yellow-500">
                        전체 관리자
                      </span>
                    </div>
                  )}
                </div>

              </button>


              <div className="flex flex-row items-center gap-2">

            
                {address && !loadingUser && (
                    <div className="w-full flex flex-row items-center justify-end gap-2">

                      <div className="hidden flex-row items-center justify-center gap-2">

                          <button
                              className="text-lg text-zinc-600 underline"
                              onClick={() => {
                                  navigator.clipboard.writeText(address);
                                  toast.success(Copied_Wallet_Address);
                              } }
                          >
                              {address.substring(0, 6)}...{address.substring(address.length - 4)}
                          </button>
                          
                          <Image
                              src="/icon-shield.png"
                              alt="Wallet"
                              width={100}
                              height={100}
                              className="w-6 h-6"
                          />

                      </div>

                      <div className="hidden flex-row items-center justify-end  gap-2">
                        <Image
                            src="/icon-wallet.png"
                            alt="Wallet"
                            width={100}
                            height={100}
                            className="w-6 h-6"
                        />
                        <span className="text-2xl xl:text-4xl font-semibold text-green-600">
                            {Number(balance).toFixed(2)}
                        </span>
                      </div>


                      <button
                        onClick={() => {
                          router.push('/' + params.lang + '/' + params.center + '/profile-settings');
                        }}
                        className="
                        w-32 h-10 items-center justify-center
                        flex bg-[#3167b4] text-sm text-[#f3f4f6] px-4 py-2 rounded-lg hover:bg-[#3167b4]/80"
                      >
                        {user?.nickname || "프로필"}
                      </button>


                  </div>
                )}


              </div>


          </div>


          <div className="flex flex-col items-start justify-center gap-2">

            

            {/* USDT 가격 binance market price */}
            <div
              className="
              h-20
                w-full flex
                binance-widget-marquee
              flex-row items-center justify-center gap-2
              p-2
              "


              data-cmc-ids="1,1027,52,5426,3408,74,20947,5994,24478,13502,35336,825"
              data-theme="dark"
              data-transparent="true"
              data-locale="ko"
              data-fiat="KRW"
              //data-powered-by="Powered by OneClick USDT"
              //data-disclaimer="Disclaimer"
            ></div>


            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 mb-4">


                <button
                  onClick={() => router.push('/' + params.lang + '/' + params.center + '/paymaster' + '?memberid=' + memberid)}
                  className="flex w-32 bg-[#3167b4] text-[#f3f4f6] text-sm rounded-lg p-2 items-center justify-center
                  hover:bg-[#3167b4]/80
                  hover:cursor-pointer
                  hover:scale-105
                  transition-transform duration-200 ease-in-out
                  ">
                  홈
                </button>     


            </div>








              <div className='flex flex-row items-center space-x-4'>
                  <Image
                    src="/icon-trade.png"
                    alt="Trade"
                    width={35}
                    height={35}
                    className="w-6 h-6"
                  />

                  <div className="text-xl font-semibold">
                    거래내역
                  </div>

              </div>






              
              <div className="w-full flex flex-row items-center justify-end gap-2 mt-4">

                {/*
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-sm">전체</div>
                  <div className="text-xl font-semibold text-zinc-500">
                    {totalCount}
                  </div>
                </div>
                */}


              </div>
              




              <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-3">



                {/* serach fromDate and toDate */}
                {/* DatePicker for fromDate and toDate */}
                <div className="flex flex-col xl:flex-row items-center gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src="/icon-calendar.png"
                      alt="Calendar"
                      width={20}
                      height={20}
                      className="rounded-lg w-5 h-5"
                    />
                    <input
                      type="date"
                      value={searchFromDate}
                      onChange={(e) => setSearchFormDate(e.target.value)}
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                    />
                  </div>

                  <span className="text-sm text-gray-500">~</span>

                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src="/icon-calendar.png"
                      alt="Calendar"
                      width={20}
                      height={20}
                      className="rounded-lg w-5 h-5"
                    />
                    <input
                      type="date"
                      value={searchToDate}
                      onChange={(e) => setSearchToDate(e.target.value)}
                      className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                    />
                  </div>
                </div>


                {/* search depositName */}
                <div className="flex flex-col items-center gap-2">


                  <div className="flex flex-col xl:flex-row items-center justify-center gap-2">
                    {/* search nickname */}
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchBuyer}
                        onChange={(e) => setSearchBuyer(e.target.value)}
                        placeholder="회원 아이디"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      />
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchDepositName}
                        onChange={(e) => setSearchDepositName(e.target.value)}
                        placeholder="입금자명"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      />
                    </div>

                    {/* searchStoreBankAccountNumber */}
                    <div className="flex flex-row items-center gap-2">
                      <input
                        type="text"
                        value={searchStoreBankAccountNumber}
                        onChange={(e) => setSearchStoreBankAccountNumber(e.target.value)}
                        placeholder="입금통장번호"
                        className="w-full p-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3167b4]"
                      /> 
                    </div>



                  


                    {/* 검색 버튼 */}
                    {/*
                    <div className="
                      w-28  
                      flex flex-row items-center gap-2">
                      <button
                        onClick={() => {
                          setPageValue(1);
                          
                          fetchBuyOrders();
                        }}
                        //className="bg-[#3167b4] text-white px-4 py-2 rounded-lg w-full"
                        className={`${
                          fetchingBuyOrders ? 'bg-gray-400' : 'bg-[#3167b4]'
                        }
                        text-white px-4 py-2 rounded-lg w-full
                        hover:bg-[#3167b4]/80
                        hover:cursor-pointer
                        hover:scale-105
                        transition-transform duration-200 ease-in-out`}
                        title="검색"

                        disabled={fetchingBuyOrders}
                      >
                        <div className="flex flex-row items-center justify-between gap-2">
                          <Image
                            src="/icon-search.png"
                            alt="Search"
                            width={20}
                            height={20}
                            className="rounded-lg w-5 h-5"
                          />
                          <span className="text-sm">
                            {fetchingBuyOrders ? '검색중...' : '검색'}
                          </span>
                        </div>

                      </button>
                    </div>
                    */}

                  </div>



                </div>


              </div>



              {/* table view is horizontal scroll */}
              {tableView ? (


                <div className="w-full overflow-x-auto">

                  <table className=" w-full table-auto border-collapse border border-zinc-800 rounded-md">

                    <thead
                      className="bg-zinc-800 text-white text-sm font-semibold"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <tr>
                        <th className="p-2">
                          <div className="flex flex-col gap-2 items-center justify-center">
                            <span className="text-sm text-white font-semibold">
                              구매신청시간
                            </span>
                            <span className="text-sm text-white font-semibold">
                              {TID}
                            </span>
                          </div>
                        </th>
                        <th className="p-2">가맹점</th>
                        <th className="p-2">구매자 아이디</th>
                        <th className="p-2">입금자</th>

                        <th className="p-2">
                          <div className="flex flex-col gap-2 items-center justify-center">
                            <span className="text-sm text-white font-semibold">
                              구매금액(원)
                            </span>
                            <span className="text-sm text-white font-semibold">
                              구래량(USDT)
                            </span>
                            <span className="text-sm text-white font-semibold">
                              환율
                            </span>
                          </div>
                        </th>

                        <th className="p-2">판매자 아이디</th>
                        <th className="p-2">판매자 입금통장</th>

                        <th className="p-2">자동입금처리</th>
                        <th className="p-2">{Status}</th>
                        {/*<th className="p-2">{Trades}</th>*/}

                        {/*
                        <th className="p-2">자동결제 및 정산(USDT)</th>
                        */}

                      </tr>
                    </thead>

                    {/* if my trading, then tr has differenc color */}
                    <tbody>

                      {buyOrders.map((item, index) => (

                        
                        <tr key={index} className={`
                          ${
                            index % 2 === 0 ? 'bg-zinc-100' : 'bg-zinc-200'


                            //item.walletAddress === address ?
                            
  
                          }
                        `}>
                        

                          <td className="p-2">

                            <div className="
                              w-28
                              flex flex-col gap-2 items-center justify-center">

                              <div className="flex flex-col gap-2 items-center justify-center">
                                <span className="text-sm text-zinc-500 font-semibold">
                                  {item?.createdAt && new Date(item.createdAt)?.toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                  })}
                                </span>

                                <span className="text-sm text-zinc-500 font-semibold">
                                  {item?.createdAt && new Date(item.createdAt)?.toLocaleString('en-US', {

                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                  })}
                                </span>

                              </div>

                              <span className="text-sm text-zinc-500 font-semibold">
                                {params.lang === 'ko' ? (
                                  <p>{
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) :
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )
                                  }</p>
                                ) : (
                                  <p>{
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                    ) :
                                    new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                    ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                    ) : (
                                      ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                    )
                                  }</p>
                                )}
                              </span>


                              <button
                                onClick={() => {
                                  // copy tradeId to clipboard
                                  navigator.clipboard.writeText(item.tradeId);
                                  toast.success('거래번호가 복사되었습니다.');
                                }}
                                className="text-sm text-zinc-500 font-semibold
                                  hover:text-blue-600 cursor-pointer
                                  hover:underline"
                                title="거래번호 복사"
                              >
                                #{item?.tradeId}
                              </button>

                            </div>
                          </td>

                          <td className="text-zinc-500 p-2">
                            

                            <div className="
                              w-28
                              flex flex-row gap-2 items-center justify-start">
                              
                              <Image
                                src={item?.store?.storeLogo || "/icon-store.png"}
                                alt="Store"
                                width={20}
                                height={20}
                                className="rounded-full w-8 h-8"
                              />
                              <div className="flex flex-col gap-2 items-center justify-start">
                                <span className="text-sm text-zinc-500 font-semibold">
                                  {
                                    item?.store?.storeName.length > 10 ?
                                    item?.store?.storeName.substring(0, 10) + '...' :
                                    item?.store?.storeName
                                  }
                                </span>
                                {/*
                                <span className="text-sm text-zinc-500 font-semibold">
                                  {item?.store?.storecode}
                                </span>
                                */}
                                {/* storecode copy to clipboard */}
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(item?.store?.storecode);
                                    toast.success('가맹점코드가 복사되었습니다.');
                                  }}
                                  className="text-sm text-zinc-500 font-semibold
                                  hover:text-blue-600 cursor-pointer
                                  hover:underline"
                                  title="가맹점코드 복사"
                                >
                                  {item?.store?.storecode}
                                </button>

                              </div>
                            </div>

                          </td>

                          
                          <td className="p-2">
                            <div className="
                              w-20  
                              flex flex-col items-center justify-center gap-2">

                                {/* buyer nickname */}
                                <div className="text-lg text-blue-600 font-semibold">
                                  {item?.nickname}
                                </div>

                                {/* wallet address */}
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(item.walletAddress);
                                    toast.success('지갑주소가 복사되었습니다.');
                                  }}
                                  className="text-sm text-zinc-500 font-semibold
                                  hover:text-blue-600 cursor-pointer
                                  hover:underline"
                                  title="지갑주소 복사"
                                >
                                  {item.walletAddress.substring(0, 10) + '...'}
                                </button>

                            </div>
                          </td>


                          
                          <td className="p-2">
                            <div className="
                              w-24 
                              flex flex-col items-center justify-center gap-2">

                                <div className="text-lg text-yellow-600 font-semibold">
                                  {
                                    item?.buyer?.depositName

                                  }
                                </div>
                                <div className="text-sm text-zinc-500 font-semibold">
                                  {
                                    item?.buyer?.depositBankName

                                  }
                                </div>

                                <div className="text-sm text-zinc-500 font-semibold">
                                  {
                                    item?.buyer?.depositBankAccountNumber &&
                                    item?.buyer?.depositBankAccountNumber.slice(0, 5) + '...'
                                  }
                                </div>

                            </div>
                          </td>



                          <td className="p-2">
                            <div className="
                              w-26
                              flex flex-col gap-2 items-center justify-center">

                              <div className="flex flex-col gap-2 items-end justify-center">
                                <span className="text-lg text-yellow-600 font-semibold"
                                  style={{
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  {Number(item.krwAmount)?.toLocaleString()}{' '}원
                                </span>
                                <div className="flex flex-row items-center gap-1">
                                  <Image
                                    src="/icon-tether.png"
                                    alt="Tether"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                  />
                                  <span className="text-lg text-green-600 font-semibold"
                                    style={{
                                      fontFamily: 'monospace',
                                      }}
                                    >
                                    {item.usdtAmount
                                      ? Number(item.usdtAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                      : 0
                                    }
                                  </span>
                                </div>
                              </div>
                              <span className="text-sm text-zinc-500 font-semibold"
                                style={{
                                  fontFamily: 'monospace',
                                }}
                              >
                                {
                                  Number(item.rate)
                                  //Number(item.krwAmount / item.usdtAmount).toFixed(2)
                                }
                              </span>
                            </div>
                          </td>


                          <td className="text-zinc-500 p-2">
                            <div className="
                              w-24
                              flex flex-col gap-2 items-center justify-center">
                              <span className="text-lg font-semibold text-blue-600">
                                {
                                  item.seller?.nickname
                                }
                              </span>
                              {/* seller.walletAddress */}
                              <button
                                className="text-sm text-zinc-500 font-semibold
                                  hover:text-blue-500
                                  hover:underline
                                  cursor-pointer
                                  "
                                title="지갑주소 복사"

                                onClick={() => {
                                  
                                  // copy to clipboard
                                  navigator.clipboard.writeText(item.seller?.walletAddress || '');

                                  toast.success('지갑주소가 복사되었습니다.');
                                }}
                              >
                                {item.seller?.walletAddress &&
                                  item.seller?.walletAddress.substring(0, 10) + '...'}
                              </button>
                            </div>
                          </td>



                          <td className="p-2">
                            <div className="
                              w-24
                              flex flex-col gap-2 items-center justify-center">
                              <div className="text-sm font-semibold text-zinc-500">
                                {item?.store?.bankInfo?.bankName}
                              </div>

                              {/* copy account number to clipboard */}
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(item?.store?.bankInfo?.accountNumber);
                                  toast.success('입금통장번호가 복사되었습니다.');
                                }}
                                className="text-sm text-zinc-500 font-semibold
                                  hover:text-blue-600 cursor-pointer
                                  hover:underline"
                                title="입금통장번호 복사"
                              >
                                {item?.store?.bankInfo?.accountNumber}
                              </button>

                              <div className="text-sm font-semibold text-zinc-500">
                                {item?.store?.bankInfo?.accountHolder}
                              </div>
                            </div>
                          </td>


                          <td className="p-2">
                            <div className="
                              w-32
                              flex flex-col items-end justify-center gap-2">

                                {item?.autoConfirmPayment ? (
                                  <span className="text-sm text-green-500 font-semibold">
                                    자동입금처리
                                  </span>
                                ) : (
                                  <span className="text-sm text-red-500 font-semibold">
                                    수동입금처리
                                  </span>
                                )}
                              
                                <div className=" text-yellow-600 text-lg font-semibold"
                                  style={{
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  {
                                    item?.paymentAmount &&
                                    item?.paymentAmount?.toLocaleString() + ' 원'
                                  }

                                </div>
                            </div>
                          </td>



                          <td className="p-2">

                            <div className="
                              w-40 
                              flex flex-col gap-2 items-center justify-center">

                              <div className="flex flex-row items-center gap-2">
                                {/* status */}
                                {item.status === 'ordered' && (
                                  <div className="text-sm text-yellow-500 font-semibold">
                                    {Buy_Order_Opened}
                                  </div>
                                )}


                                {item.status === 'accepted' && (

                                  <div className="flex flex-row gap-2 items-center justify-center gap-1">
                                    <div className="text-sm text-green-500">
                                      {Trade_Started}
                                    </div>
                                    {/*
                                    <div className="text-sm text-white">
                                      {item.seller?.nickname}
                                    </div>
                                    */}
                                    <div className="text-sm text-zinc-500">

                                      {params.lang === 'ko' ? (
                                        <p>{
                                          new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                          ) :
                                          new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                          ) : (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                          )
                                        }</p>
                                      ) : (
                                        <p>{
                                          new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                          ) :
                                          new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                          ) : (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                          )
                                        }</p>
                                      )}

                                    </div>


                                  </div>
                                )}

                                {item.status === 'paymentRequested' && (
                                  <div className="flex flex-row gap-1 items-start justify-start">
                                    <div className="text-sm text-green-500">
                                      {/*Waiting_for_seller_to_deposit*/}

                                      {Escrow_Completed}


                                    </div>

                                    {/*
                                    <div className="text-sm text-white">
                                      {item.seller?.nickname}
                                    </div>
                                    */}

                                    <div className="text-sm text-zinc-500">
                                      {/* from now */}
                                      {
                                        new Date().getTime() - new Date(item.paymentRequestedAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.paymentRequestedAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) : new Date().getTime() - new Date(item.paymentRequestedAt).getTime() < 1000 * 60 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.paymentRequestedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.paymentRequestedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                      }
                                    </div>


                                  </div>
                                )}

                                {item.status === 'cancelled' && (
                                  <div className="flex flex-row gap-1 items-start justify-start">

                                      <div className="text-sm text-red-600">
                                        {
                                          Cancelled_at
                                        }
                                      </div>
                                      {/*
                                      <span className="text-sm text-white">
                                        {item.seller?.nickname}
                                      </span>
                                      */}

                                      <div className="text-sm text-zinc-500">
                                        {
                                          // from now
                                          new Date().getTime() - new Date(item.cancelledAt).getTime() < 1000 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.cancelledAt).getTime()) / 1000) + ' ' + seconds_ago
                                          ) : new Date().getTime() - new Date(item.cancelledAt).getTime() < 1000 * 60 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.cancelledAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                          ) : (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.cancelledAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                          )
                                        }
                                      </div>

                                  </div>
                                )}


                                {/* if status is accepted, show payment request button */}
                                {item.status === 'paymentConfirmed' && (
                                  <div className="
                                    w-full
                                    flex flex-row gap-1 items-start justify-start">

                                      <button
                                        className="text-sm text-green-500 font-semibold
                                          border border-green-500 rounded-lg p-2
                                          bg-green-100
                                          w-full text-center
                                          hover:bg-green-200
                                          cursor-pointer
                                          transition-all duration-200 ease-in-out
                                          hover:scale-105
                                          hover:shadow-lg
                                          hover:shadow-green-500/50
                                        "
                                        onClick={() => {
                                          // new window to complete trade
                                          // {`https://www.cryptoss-runway.vercel.app/ko/${item?.storecode}/pay-usdt-reverse/${item?._id}`}

                                          window.open(
                                            `/${params.lang}/${item?.storecode}/pay-usdt-reverse/${item?._id}`,
                                            '_blank'
                                          );

                                        }}
                                      >
                                        {Completed}
                                      </button>

                                    <span
                                      className="
                                        w-28 
                                        text-sm text-zinc-500"
                                    >{
                                      //item.paymentConfirmedAt && new Date(item.paymentConfirmedAt)?.toLocaleString()
                                      // from now
                                      new Date().getTime() - new Date(item.paymentConfirmedAt).getTime() < 1000 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000) + ' ' + seconds_ago
                                      ) : new Date().getTime() - new Date(item.paymentConfirmedAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                      ) : (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.paymentConfirmedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                      )

                                    }</span>
                                  </div>
                                )}





                                {item.status === 'completed' && (
                                  
                                  <div className="text-sm text-green-500">
                                    {Completed_at}
                                  </div>
                                )}

                              </div>

                              {/* polygonscan */}
                              {item?.transactionHash
                              && item?.transactionHash !== '0x'
                              && (
                                <button
                                  className="text-sm text-blue-600 font-semibold
                                    border border-blue-600 rounded-lg p-2
                                    bg-blue-100
                                    w-full text-center
                                    hover:bg-blue-200
                                    cursor-pointer
                                    transition-all duration-200 ease-in-out
                                    hover:scale-105
                                    hover:shadow-lg
                                    hover:shadow-blue-500/50
                                  "
                                  onClick={() => {
                                    window.open(
                                      `https://arbiscan.io/tx/${item.transactionHash}`,
                                      '_blank'
                                    );
                                  }}
                                >
                                  <div className="flex flex-row gap-2 items-center justify-center">
                                    <Image
                                      src="/logo-arbitrum.png"
                                      alt="Polygon"
                                      width={20}
                                      height={20}
                                      className="w-5 h-5"
                                    />
                                    <span className="text-sm">
                                      USDT 전송내역
                                    </span>
                                  </div>
                                </button>
                              )}




                            </div>
                          </td>

                          {/*
                          <td className="p-2">

                            <div className="flex flex-col gap-2 items-start justify-start">

                              {item.status === 'accepted' && item.seller && item.seller.walletAddress !== address && (
                                <span className="text-sm text-white">
                                  {item.seller.nickname}
                                </span>
                              )}

                              {item.status === 'accepted' && item.seller && item.seller.walletAddress === address && (
                                
                                <div className="flex flex-row items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={agreementForCancelTrade[index]}
                                    onChange={(e) => {
                                      setAgreementForCancelTrade(
                                        agreementForCancelTrade.map((item, idx) => idx === index ? e.target.checked : item)
                                      );
                                    }}
                                  />
                                  <button
                                    disabled={cancellings[index] || !agreementForCancelTrade[index]}
                  
                                    className={`flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md ${cancellings[index] || !agreementForCancelTrade[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                      
                                    onClick={() => {
                                      cancelTrade(item._id, index);
                                    }}
                                  >
                                    {cancellings[index] && (
                                      <Image
                                        src="/loading.png"
                                        alt="Loading"
                                        width={20}
                                        height={20}
                                        className="animate-spin"
                                      />
                                    )}
                                    
                                    <span className="text-sm">{Cancel_My_Trade}</span>
                                  
                                  </button>
                                </div>

                              )}





                              {user && user.seller &&
                              item.status === 'ordered' && item.walletAddress !== address && (
                                
                                <div className="flex flex-row items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={agreementForTrade[index]}
                                    onChange={(e) => {
                                      setAgreementForTrade(
                                        agreementForTrade.map((item, idx) => idx === index ? e.target.checked : item)
                                      );
                                    }}
                                  />
                                  <button
                                    disabled={acceptingBuyOrder[index] || !agreementForTrade[index]}
                                    className={`
                                      flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md
                                      ${acceptingBuyOrder[index] || !agreementForTrade[index] ?
                                        'bg-zinc-500 text-white' : 'bg-green-500 text-white '}
                                    `}
                                    onClick={() => {
                                      acceptBuyOrder(index, item._id, smsReceiverMobileNumber);
                                    }}
                                  >
                                    {acceptingBuyOrder[index] && (
                                      <Image
                                        src="/loading.png"
                                        alt="Loading"
                                        width={20}
                                        height={20}
                                        className="animate-spin"
                                      />
                                    )}
                                    <span className="text-sm">{Buy_Order_Accept}</span>
                                    
                                  </button>
                                </div>

                              )}






                              
                              {
                                item.seller && item.seller.walletAddress === address &&
                                item.status === 'accepted' && (
                                <div className="flex flex-row gap-2">

                                  <input
                                    disabled={escrowing[index] || requestingPayment[index]}
                                    type="checkbox"
                                    checked={requestPaymentCheck[index]}
                                    onChange={(e) => {
                                      setRequestPaymentCheck(
                                        requestPaymentCheck.map((item, idx) => {
                                          if (idx === index) {
                                            return e.target.checked;
                                          }
                                          return item;
                                        })
                                      );
                                    }}
                                  />

                                  <button
                                    disabled={escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index]}
                                    
                                    className={`flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md ${escrowing[index] || requestingPayment[index] || !requestPaymentCheck[index] ? 'bg-gray-500' : 'bg-green-500'}`}
                                    onClick={() => {

                                      requestPayment(
                                        index,
                                        item._id,
                                        item.tradeId,
                                        item.usdtAmount
                                      );
                                    }}
                                  >
                                    <Image
                                      src="/loading.png"
                                      alt="loading"
                                      width={16}
                                      height={16}
                                      className={escrowing[index] || requestingPayment[index] ? 'animate-spin' : 'hidden'}
                                    />
                                    <span className="text-sm">
                                      {Request_Payment}
                                    </span>
                                  
                                  </button>

                                </div>
                              )}



                              {item.seller && item.seller.walletAddress === address &&   
                              item.status === 'paymentRequested' && (

                                <div className="flex flex-col gap-2">

                              
                                  
                                  <div className="flex flex-row gap-2">

                                    <input
                                      disabled={confirmingPayment[index]}
                                      type="checkbox"
                                      checked={confirmPaymentCheck[index]}
                                      onChange={(e) => {
                                        setConfirmPaymentCheck(
                                          confirmPaymentCheck.map((item, idx) => {
                                            if (idx === index) {
                                              return e.target.checked;
                                            }
                                            return item;
                                          })
                                        );
                                      }}
                                    />

                                    <button
                                      disabled={confirmingPayment[index] || !confirmPaymentCheck[index]}
                                      className={`flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md ${confirmingPayment[index] || !confirmPaymentCheck[index] ? 'bg-gray-500' : 'bg-green-500'}`}
                                      onClick={() => {
                                        confirmPayment(
                                          index,
                                          item._id,
                                          paymentAmounts[index],
                                          paymentAmountsUsdt[index]
                                        );
                                      }}

                                    >

                                      <Image
                                        src="/loading.png"
                                        alt="loading"
                                        width={16}
                                        height={16}
                                        className={confirmingPayment[index] ? 'animate-spin' : 'hidden'}
                                      />
                                      <span className="text-sm">
                                        {Confirm_Payment}
                                      </span>

                                    </button>

                                  </div>



                                  <div className="flex flex-row gap-2">

                                    <input
                                      disabled={rollbackingPayment[index]}
                                      type="checkbox"
                                      checked={rollbackPaymentCheck[index]}
                                      onChange={(e) => {
                                        setRollbackPaymentCheck(
                                          rollbackPaymentCheck.map((item, idx) => {
                                            if (idx === index) {
                                              return e.target.checked;
                                            }
                                            return item;
                                          })
                                        );
                                      }}
                                    />

                                    <button
                                      disabled={rollbackingPayment[index] || !rollbackPaymentCheck[index]}
                                      className={`flex flex-row gap-1 text-sm text-white px-2 py-1 rounded-md ${rollbackingPayment[index] || !rollbackPaymentCheck[index] ? 'bg-gray-500' : 'bg-red-500'}`}
                                      onClick={() => {
                                        rollbackPayment(
                                          index,
                                          item._id,
                                          paymentAmounts[index],
                                          paymentAmountsUsdt[index]
                                        );
                                      }}

                                    >
                                        
                                        <Image
                                          src="/loading.png"
                                          alt="loading"
                                          width={16}
                                          height={16}
                                          className={rollbackingPayment[index] ? 'animate-spin' : 'hidden'}
                                        />
                                        <span className="text-sm">
                                          에스크로 취소
                                        </span>

                                    </button>

                                  </div>


                                </div>

                              



                              )}

                              

                            </div>


                          </td>

                          */}



                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>


              ) : (

                <div className="w-full grid gap-4 lg:grid-cols-2 xl:grid-cols-3 justify-center ">

                    {buyOrders.map((item, index) => (
        
                      <div
                        key={index}
                        className="relative flex flex-col items-center justify-center"
                      >


                        {item.status === 'ordered' && (new Date().getTime() - new Date(item.createdAt).getTime() > 1000 * 60 * 60 * 24) && (
                          <div className="absolute inset-0 flex justify-center items-center z-10
                            bg-black bg-opacity-50
                          ">
                            <Image
                              src="/icon-expired.png"
                              alt="Expired"
                              width={100}
                              height={100}
                              className="opacity-20"
                            />
                          </div>
                        )}

                        {item.status === 'cancelled' && (
                          <div className="absolute inset-0 flex justify-center items-center z-10
                            bg-black bg-opacity-50
                          ">
                            <Image
                              src="/icon-cancelled.png"
                              alt="Cancelled"
                              width={100}
                              height={100}
                              className="opacity-20"
                            />
                          </div>
                        )}


                        <article
                            //key={index}
                            className={` w-96 xl:w-full h-full relative
                              ${item.walletAddress === address ? 'border-green-500' : 'border-gray-200'}

                              ${item.status === 'accepted' || item.status === 'paymentRequested' ? 'border-red-600' : 'border-gray-200'}

                              p-4 rounded-md border bg-black bg-opacity-50
                          `}
                        >

                          {item.status === 'ordered' && (

  
                            <div className="w-full flex flex-col gpa-2 items-start justify-start">


                                <div className="w-full flex flex-row items-center justify-between gap-2">

                                  <div className="flex flex-row items-center gap-2">

                                    {/* if createdAt is recent 1 hours, show new badge */}
                                    {new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 && (
                                      <Image
                                        src="/icon-new.png"
                                        alt="New"
                                        width={28}
                                        height={28}
                                      />
                                    )}

                                    <Image
                                      src="/icon-public-sale.png"
                                      alt="Public Sale"
                                      width={28}
                                      height={28}
                                    />

                                  

                                    {params.lang === 'ko' ? (

                                      <p className="text-sm text-zinc-500">

                                      
                                        {

                                          new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                          ) :
                                          new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                          ) : (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                          )
                                        }{' '}{Buy_Order_Opened} 

                                      </p>
                                      
                                      ) : (

                                        <p className="text-sm text-zinc-500">


                                      
                                        {Buy_Order_Opened}{' '}{

                                          new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000) + ' ' + seconds_ago
                                          ) :
                                          new Date().getTime() - new Date(item.createdAt).getTime() < 1000 * 60 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                          ) : (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                          )
                                        }



                                      </p>


                                    )}

                                  </div>



                                  {/* share button */}
                                  {/*
                                  <button
                                    className="text-sm bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                                    onClick={() => {

                                      window.open(`https://gold.goodtether.com/${params.lang}/sell-usdt/${item._id}`, '_blank');

                                    }}
                                  >
                                    <Image
                                      src="/icon-share.png"
                                      alt="Share"
                                      width={20}
                                      height={20}
                                    />
                                  </button>
                                  */}


                                </div>


                                {24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) > 0 ? (

                                  <div className="mt-2 flex flex-row items-center space-x-2">
                                    <Image
                                      src="/icon-timer.webp"
                                      alt="Timer"
                                      width={28}
                                      height={28}
                                    />
                                    <p className="text-sm text-zinc-500">{Expires_in} {
    
                                      24 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60 / 60) - 1

                                      } {hours} {
                                        60 - Math.floor((new Date().getTime() - new Date(item.createdAt).getTime()) / 1000 / 60) % 60
                                      } {minutes}

                                    </p>
                                  </div>

                                ) : (
                                  <div className="mt-2 flex flex-row items-center space-x-2">
                                    {/*
                                    <Image
                                      src="/icon-timer.webp"
                                      alt="Expired"
                                      width={28}
                                      height={28}
                                    />
                                    <p className="text-sm text-zinc-500">Expired</p>
                                    */}
                                  </div>
                                )}
    
                            </div>

                          )}





                          { (item.status === 'accepted' || item.status === 'paymentRequested' || item.status === 'cancelled') && (
                              
                            <div className={`
                              ${item.status !== 'cancelled' && 'h-16'}

                              mb-4 flex flex-row items-center bg-zinc-800 px-2 py-1 rounded-md`}>
                                <Image
                                  src="/icon-trade.png"
                                  alt="Trade"
                                  width={32}
                                  height={32}
                                />


                                <p className="text-sm font-semibold text-green-500 ">
                                  {item.tradeId}
                                </p>

                                {item.status === 'cancelled' ? (
                                  <p className="ml-2 text-sm text-zinc-500">
                                    {new Date(item.acceptedAt)?.toLocaleString()}
                                  </p>
                                ) : (
                                  
                                  <>
                                    {params.lang === 'ko' ? (

                                      <p className="ml-2 text-sm text-zinc-500">

                                      
                                        {new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                        ) :
                                        new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                        ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                        ) : (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                        )
                                        }{' '}{Trade_Started}

                                      </p>



                                    ) : (

                                      <p className="ml-2 text-sm text-zinc-500">

                                        {Trade_Started} {
                                          new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 ? (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000) + ' ' + seconds_ago
                                          ) :
                                          new Date().getTime() - new Date(item.acceptedAt).getTime() < 1000 * 60 * 60 ? (
                                          ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) + ' ' + minutes_ago
                                          ) : (
                                            ' ' + Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) + ' ' + hours_ago
                                          )
                                        }

                                      </p>

                                    )}




                                  </>
                                
                                )}



                                  {/* share button */}
                                  <button
                                    className="ml-5 text-sm bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                                    onClick={() => {

                                      //window.open(`https://gold.goodtether.com/${params.lang}/${params.center}/sell-usdt/${item._id}`, '_blank');

                                      // copy to clipboard

                                      navigator.clipboard.writeText(`https://gold.goodtether.com/${params.lang}/${params.center}/sell-usdt/${item._id}`);

                                      toast.success('Link copied to clipboard');

                                    }}
                                  >
                                    <Image
                                      src="/icon-share.png"
                                      alt="Share"
                                      width={20}
                                      height={20}
                                    />
                                  </button>



                              </div>
                          )}


                            {/*
                            
                            {item.acceptedAt && (
                              <p className="mb-2 text-sm text-zinc-500">
                                Trade started at {new Date(item.acceptedAt).toLocaleDateString() + ' ' + new Date(item.acceptedAt).toLocaleTimeString()}
                              </p>
                            )}
                            */}




                          {item.status === 'cancelled' && (
                              <div className="mt-4 flex flex-row items-center gap-2">
                                <Image
                                  src='/icon-cancelled.webp'
                                  alt='cancel'
                                  width={20}
                                  height={20}
                                />
                                <p className="text-sm text-red-500">
                                  {Cancelled_at} {
                                    new Date(item.cancelledAt).toLocaleDateString() + ' ' + new Date(item.cancelledAt).toLocaleTimeString()
                                  }
                                </p>
                              </div>
                            )}




                  

                            <div className="mt-4 flex flex-col items-start">



                              <p className="text-2xl text-zinc-500">
                                {Price}: {
                                  // currency
                                
                                  Number(item.krwAmount)?.toLocaleString('ko-KR', {
                                    style: 'currency',
                                    currency: 'KRW',
                                  })

                                }
                              </p>

                              <div className="mt-2 flex flex-row items-start gap-2">

                                <p className="text-xl font-semibold text-zinc-500">
                                  {item.usdtAmount}{' '}USDT
                                </p>
                                <p className="text-lg font-semibold text-zinc-500">{Rate}: {

                                  Number(item.krwAmount / item.usdtAmount).toFixed(2)

                                  }</p>
                              </div>


                            </div>

                    

                            <div className="mb-4 flex flex-col items-start text-sm ">
                              {Payment}: {Bank_Transfer} ({item.seller?.bankInfo?.bankName})
                            </div>



                            <div className="flex flex-col items-start justify-start gap-2">
                              <p className="mt-2 mb-2 flex items-center gap-2">

                                <Image
                                    src={item.avatar || '/profile-default.png'}
                                    alt="Avatar"
                                    width={32}
                                    height={32}
                                    priority={true} // Added priority property
                                    className="rounded-full"
                                    style={{
                                        objectFit: 'cover',
                                        width: '32px',
                                        height: '32px',
                                    }}
                                />

                                <div className="flex flex-col gap-2 items-start">
                                  <div className="flex items-center space-x-2">{Buyer}:</div>

                                  <div className="text-sm font-semibold">
                                    {item.nickname}
                                  </div>
                                  <div className="text-lg text-green-500">
                                    {item.buyer?.depositName}
                                  </div>
                                </div>

                                <Image
                                  src="/verified.png"
                                  alt="Verified"
                                  width={20}
                                  height={20}
                                  className="rounded-lg"
                                />

                                <Image
                                  src="/best-buyer.png"
                                  alt="Best Buyer"
                                  width={20}
                                  height={20}
                                  className="rounded-lg"
                                />

                              </p>


                              {address && item.walletAddress !== address && item?.buyer && item?.buyer?.walletAddress === address && (
                                <button
                                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                  onClick={() => {
                                      //console.log('Buy USDT');
                                      // go to chat
                                      // close modal
                                      //closeModal();
                                      ///goChat(item._id, item.tradeId);

                                      router.push(`/${params.lang}/${params.center}/sell-usdt/${item._id}`);

                                  }}
                                >
                                  {Chat_with_Buyer + ' ' + item.nickname}
                                </button>
                              )}


                            </div>




                            {/* buyer cancelled the trade */}
                            {item.status === 'cancelled' && (
                              <div className="mt-4 flex flex-col gap-2 items-start justify-center">
                                <div className="flex flex-row items-center gap-2">
                                  <Image
                                    src={item?.buyer?.avatar || "/profile-default.png"}
                                    alt="Profile Image"
                                    width={32}
                                    height={32}
                                    priority={true} // Added priority property
                                    className="rounded-full"
                                    style={{
                                        objectFit: 'cover',
                                        width: '32px',
                                        height: '32px',
                                    }}
                                  />
                                  <p className="text-sm text-red-500 font-semibold">
                                    {Buyer}: {
                                      address && item?.buyer?.nickname ? item?.buyer?.nickname : Anonymous
                                    }
                                  </p>

                                </div>


                              </div>
                            )}



                            {(item.status === 'accepted' || item.status === 'paymentRequested') && (
                        
                              <div className="mt-4 flex flex-row items-center gap-2">
                                <Image
                                  src={item.seller?.avatar || "/profile-default.png"}
                                  alt="Profile Image"
                                  width={32}
                                  height={32}
                                  priority={true} // Added priority property
                                  className="rounded-full"
                                  style={{
                                      objectFit: 'cover',
                                      width: '32px',
                                      height: '32px',
                                  }}
                                />
                                <p className="text-xl text-green-500 font-semibold">
                                  {Seller}: {
                                    item.seller?.nickname
                                  }
                                </p>
                                <Image
                                  src="/verified.png"
                                  alt="Verified"
                                  width={20}
                                  height={20}
                                  className="rounded-lg"
                                />
                              </div>
                            
                            )}
                          

                            {/* waiting for escrow */}
                            {item.status === 'accepted' && (



                              <div className="mt-4 flex flex-col gap-2 items-center justify-start">


                                  
                                  
                                <div className="mt-4 flex flex-row gap-2 items-center justify-start">
                                  <Image
                                    src="/loading.png"
                                    alt="Escrow"
                                    width={32}
                                    height={32}
                                    className="animate-spin"
                                  />

                                  <div className="flex flex-col gap-2 items-start">
                                    <span>
                                      {Waiting_for_seller_to_deposit} {item.usdtAmount} USDT {to_escrow}...
                                    </span>

                                    <span className="text-sm text-zinc-500">

                                      {If_the_seller_does_not_deposit_the_USDT_to_escrow},

                                      {this_trade_will_be_cancelled_in} {

                                        (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) > 0
                                        ? (1 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60 / 60) - 1) + ' ' + hours
                                        : (60 - Math.floor((new Date().getTime() - new Date(item.acceptedAt).getTime()) / 1000 / 60) % 60) + ' ' + minutes

                                      } 

                                    </span>
                                  </div>
                                </div>



                              </div>
                            )}



                            {/* if status is accepted, show payment request button */}
                            {item.status === 'paymentConfirmed' && (
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-semibold text-green-500">
                                  {Completed}
                                </span>
                                <span>{
                                  item.paymentConfirmedAt && new Date(item.paymentConfirmedAt)?.toLocaleString()
                                }</span>
                              </div>
                            )}


                            {/* waiting for payment */}
                            {item.status === 'paymentRequested' && (

                                <div className="mt-4 flex flex-col gap-2 items-start justify-start">

                                  <div className="flex flex-row items-center gap-2">

                                    <Image
                                      src="/smart-contract.png"
                                      alt="Smart Contract"
                                      width={32}
                                      height={32}
                                    />
                                    <div>{Escrow}: {item.usdtAmount} USDT</div>
                                    <button
                                      className="bg-white text-black px-2 py-2 rounded-md"
                                      onClick={() => {
                            
                                          params.center === 'arbitrum' ? window.open(`https://arbiscan.io/tx/${item.escrowTransactionHash}`) : window.open(`https://arbiscan.io/tx/${item.escrowTransactionHash}`);
                                          


                                      }}
                                    >
                                      <Image
                                        src={params.center === 'arbitrum' ? '/logo-arbitrum.png' : '/logo-arbitrum.png'}
                                        alt="Chain"
                                        width={20}
                                        height={20}
                                      />
                                    </button>
                                  </div>

                                  <div className="flex flex-row gap-2 items-center justify-start">

                                    {/* rotate loading icon */}
                                  
                                    <Image
                                      src="/loading.png"
                                      alt="Escrow"
                                      width={32}
                                      height={32}
                                      className="animate-spin"
                                    />

                                    <div>Waiting for buyer to send {
                                    item.krwAmount?.toLocaleString('ko-KR', {
                                      style: 'currency',
                                      currency: 'KRW',
                                    })} to seller...</div>
                                  

                                  </div>


                                </div>
                            )}



                      



                        </article>




                        {/* status */}
                        {/*
                        <div className="absolute bottom-4 right-4 flex flex-row items-start justify-start">
                          <div className="text-sm text-zinc-500">
                            {item.status === 'ordered' ? 'Order opened at ' + new Date(item.createdAt)?.toLocaleString()
                            : item.status === 'accepted' ? 'Trade started at ' + new Date(item.acceptedAt)?.toLocaleString()
                            : item.status === 'paymentRequested' ? 'Payment requested at ' + new Date(item.paymentRequestedAt)?.toLocaleString()
                            : item.status === 'cancelled' ? 'Trade cancelled at ' + new Date(item.cancelledAt)?.toLocaleString()
                            : item.status === 'paymentConfirmed' ? 'Trade completed at ' + new Date(item.paymentConfirmedAt)?.toLocaleString()
                            : 'Unknown'}
                          </div>
                        </div>
                        */}






                      </div>
                
                    ))}

                </div>

              )}

            


            </div>

        

            {/* pagination */}
            {/* url query string */}
            {/* 1 2 3 4 5 6 7 8 9 10 */}
            {/* ?limit=10&page=1 */}
            {/* submit button */}
            {/* totalPage = Math.ceil(totalCount / limit) */}
            <div className="mt-4 flex flex-row items-center justify-center gap-4">


              <div className="flex flex-row items-center gap-2">
                <select
                  value={limit}
                  onChange={(e) =>
                    
                    router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(e.target.value)}&page=${page}&memberid=${memberid}&searchMyOrders=${searchMyOrders}`)

                  }

                  className="text-sm bg-zinc-800 text-zinc-200 px-2 py-1 rounded-md"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* 처음 페이지로 이동 */}
              <button
                disabled={Number(page) <= 1}
                className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) <= 1 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => {
                  
                  router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(limit)}&page=1&memberid=${memberid}&searchMyOrders=${searchMyOrders}`); // 처음 페이지로 이동

                }
              }
              >
                처음
              </button> 


              <button
                disabled={Number(page) <= 1}
                className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) <= 1 ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => {

                  router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(limit)}&page=${Number(page) - 1}&memberid=${memberid}&searchMyOrders=${searchMyOrders}`);

                }}
              >
                이전
              </button>


              <span className="text-sm text-zinc-500">
                {page} / {Math.ceil(Number(totalCount) / Number(limit))}
              </span>


              <button
                disabled={Number(page) >= Math.ceil(Number(totalCount) / Number(limit))}
                className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) >= Math.ceil(Number(totalCount) / Number(limit)) ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => {
                  
                  router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(limit)}&page=${Number(page) + 1}&memberid=${memberid}&searchMyOrders=${searchMyOrders}`);

                }}
              >
                다음
              </button>

              {/* 마지막 페이지로 이동 */}
              <button
                disabled={Number(page) >= Math.ceil(Number(totalCount) / Number(limit))}
                className={`text-sm text-white px-4 py-2 rounded-md ${Number(page) >= Math.ceil(Number(totalCount) / Number(limit)) ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                onClick={() => {

                  router.push(`/${params.lang}/${params.center}/trade-history?limit=${Number(limit)}&page=${Math.ceil(Number(totalCount) / Number(limit))}&memberid=${memberid}&searchMyOrders=${searchMyOrders}`);

                }}
              >
                마지막
              </button>

            </div>


            
            <div className="w-full flex flex-col items-center justify-center gap-4 p-4 bg-white shadow-md rounded-lg mt-5">
              <div className="text-sm text-zinc-600">
                © 2024 Stable Makeup. All rights reserved.
              </div>
              <div className="text-sm text-zinc-600">
                <a href={`/${params.lang}/terms-of-service`} className="text-blue-500 hover:underline">
                  이용약관
                </a>
                {' | '}
                <a href={`/${params.lang}/privacy-policy`} className="text-blue-500 hover:underline">
                  개인정보처리방침
                </a>
                {' | '}
                <a href={`/${params.lang}/contact`} className="text-blue-500 hover:underline">
                  고객센터
                </a>
              </div>
            </div> 




            
          </div>


          <Modal isOpen={isModalOpen} onClose={closeModal}>
              <TradeDetail
                  closeModal={closeModal}
                  //goChat={goChat}
              />
          </Modal>


        </main>

    );


};






// close modal

const TradeDetail = (
    {
        closeModal = () => {},
        goChat = () => {},
        
    }
) => {


    const [amount, setAmount] = useState(1000);
    const price = 91.17; // example price
    const receiveAmount = (amount / price).toFixed(2);
    const commission = 0.01; // example commission
  
    return (

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 rounded-full bg-green-500 mr-2"></span>
          <h2 className="text-lg font-semibold text-black ">Iskan9</h2>
          <span className="ml-2 text-blue-500 text-sm">318 trades</span>
        </div>
        <p className="text-gray-600 mt-2">The offer is taken from another source. You can only use chat if the trade is open.</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-gray-700">
            <span>Price</span>
            <span>{price} KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Limit</span>
            <span>40680.00 KRW - 99002.9 KRW</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Available</span>
            <span>1085.91 USDT</span>
          </div>
          <div className="flex justify-between text-gray-700 mt-2">
            <span>Seller&apos;s payment method</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 rounded-full">Tinkoff</span>
          </div>
          <div className="mt-4 text-gray-700">
            <p>24/7</p>
          </div>
        </div>
  
        <div className="mt-6 border-t pt-4 text-gray-700">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700">I want to pay</label>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(
                    e.target.value === '' ? 0 : parseInt(e.target.value)
                ) }

                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">I will receive</label>
              <input 
                type="text"
                value={`${receiveAmount} USDT`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Commission</label>
              <input 
                type="text"
                value={`${commission} USDT`}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Buy USDT');
                    // go to chat
                    // close modal
                    closeModal();
                    goChat();

                }}
            >
                Buy USDT
            </button>
            <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                onClick={() => {
                    console.log('Cancel');
                    // close modal
                    closeModal();
                }}
            >
                Cancel
            </button>
          </div>

        </div>


      </div>
    );
  };



