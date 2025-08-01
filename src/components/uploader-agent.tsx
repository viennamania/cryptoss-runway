'use client'

import { useState, useCallback, useMemo, ChangeEvent, useEffect } from 'react'
import toast from 'react-hot-toast'
import LoadingDots from './loading-dots'
import { PutBlobResult } from '@vercel/blob'


import { getDictionary } from "../app/dictionaries";

export default function Uploader(

  {
    lang,
    agentcode,
  }: {
    lang: string,
    agentcode: string  
  }

) {

  //console.log("lang", lang);

  const [dictionaryData, setDictionaryData] = useState({

    File_uploaded: "",
    Upload_a_file: "",
    Accepted_formats: "",
    Drag_and_drop_or_click_to_upload: "",
    Max_file_size: "",
    Photo_upload: "",
    Confirm_upload: "",

  });

  useEffect(() => {
    async function fetchData() {
        const dictionary = await getDictionary(lang);
        setDictionaryData(dictionary);
    }
    fetchData();
}, [lang]);

const {
  File_uploaded,
  Upload_a_file,
  Accepted_formats,
  Drag_and_drop_or_click_to_upload,
  Max_file_size,
  Photo_upload,
  Confirm_upload,
} = dictionaryData




  const [fileUpdated, setFileUpdated] = useState(false);


  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })
  const [file, setFile] = useState<File | null>(null)

  const [dragActive, setDragActive] = useState(false)

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error('File size too big (max 50MB)')
        } else {
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }))
          }
          reader.readAsDataURL(file)

          setFileUpdated(true);

        }
      }
    },
    [setData]
  )

  const [saving, setSaving] = useState(false)

  const saveDisabled = useMemo(() => {
    return !data.image || saving
  }, [data.image, saving])




  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("/api/agent/getOneAgent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              agentcode: agentcode,
            }),
        });

        const data = await response.json();

        /////console.log("getOneAgent data", data);



        if (data.result) {
            setData(
              (prev) => ({
                ...prev,
                image: data.result.agentLogo,
              })
            );
        }
    };

    fetchData();
}, [agentcode]);




  return (
    <form
      className="grid gap-6"
      onSubmit={async (e) => {
        e.preventDefault()
        setSaving(true)
        fetch('/api/upload', {
          method: 'POST',
          headers: { 'content-type': file?.type || 'application/octet-stream' },
          body: file,
        }).then(async (res) => {

          if (res.status === 200) {

            const { url } = (await res.json()) as PutBlobResult;

            ///console.log("url", url);


            const result = await fetch("/api/agent/setAgentLogo", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                agentcode: agentcode,
                agentLogo: url,
              }),
            });

            




            toast(
              (t: { id: string } 
                ) => (
                <div className="relative">

                  

          
                    <div className="p-2">

                      <p className="text-sm text-gray-900 mt-1">
                        {File_uploaded}
                      </p>


                      {/*
                      <p className="mt-1 text-sm text-gray-500">
                        Your file has been uploaded to{' '}
                        <a
                          className="font-medium text-gray-900 underline"
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url}
                        </a>
                      </p>
                      */}

                    </div>


                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="absolute top-0 -right-2 inline-flex text-gray-400 focus:outline-none focus:text-gray-500 rounded-full p-1.5 hover:bg-gray-100 transition ease-in-out duration-150"
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 5.293a1 1 0 011.414 0L10
                            8.586l3.293-3.293a1 1 0 111.414 1.414L11.414
                            10l3.293 3.293a1 1 0 01-1.414 1.414L10
                            11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586
                            10 5.293 6.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

            

                </div>
              ),
              { duration: 3000 }
            )

          } else {
            const error = await res.text()
            toast.error(error)
          }
          
          setSaving(false)


          setFileUpdated(false);

        })
      }}
    >
      <div>
        <div className="space-y-1 mb-4">
          <h2 className="text-sm font-semibold">
            {Upload_a_file}
          </h2>
          <p className="text-sm">
            {Accepted_formats}
          </p>
          <p className="text-sm">
           .png, .jpg, .gif, .mp4
          </p>
        </div>
        <label
          htmlFor="image-upload"
          className="group relative mt-2 flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)

              const file = e.dataTransfer.files && e.dataTransfer.files[0]
              if (file) {
                if (file.size / 1024 / 1024 > 50) {
                  toast.error('File size too big (max 50MB)')
                } else {
                  setFile(file)
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    setData((prev) => ({
                      ...prev,
                      image: e.target?.result as string,
                    }))
                  }
                  reader.readAsDataURL(file)
                }
              }
            }}
          />
          <div
            className={`${
              dragActive ? 'border-2 border-black' : ''
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-2 transition-all ${
              data.image
                ? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
                : 'bg-white opacity-100 hover:bg-gray-50'
            }`}
          >
            <svg
              className={`${
                dragActive ? 'scale-110' : 'scale-100'
              } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p className="mt-2 text-center text-xs text-gray-500">
              {Drag_and_drop_or_click_to_upload}
            </p>
            <p className="mt-2 text-center text-xs text-gray-500">
              {Max_file_size}
            </p>
            <span className="sr-only">
              {Photo_upload}
            </span>
          </div>
          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onChangePicture}
          />
        </div>
      </div>

      {fileUpdated && (
        <button
          disabled={saveDisabled}
          className={`${
            saveDisabled
              ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
              : 'border-black bg-black text-white hover:bg-white hover:text-black'
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {saving ? (
            <LoadingDots color="#808080" />
          ) : (
              <p className="text-sm">
                
                {Confirm_upload}
               

              </p>
          )}
        </button>
      )}
    </form>
  )
}