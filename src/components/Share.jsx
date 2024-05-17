/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BiShare } from "react-icons/bi";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import useOuterClick from "../functions/useOuterClick";

export default function Share({ prodId }) {
  const [open, setOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState();
  const innerRef = useOuterClick(() => setOpen(false));
  //   const location = useLocation()
  useEffect(() => {
    setShareUrl(`${location.origin}/#/bookDetails/${prodId}`);
  }, [prodId]);
  console.log(shareUrl);
  return (
    <div
      ref={innerRef}
      className="absolute top-1 left-1 shadow-lg bg-white p-2 w-10 h-10 text-center text-xl rounded-full"
    >
      <button className="" onClick={() => setOpen(!open)}>
        <BiShare />
      </button>
      {open && (
        <div className="flex p-1 px-2 w-fit border justify-start align-middle gap-1 bg-white shadow-lg absolute bottom-full left-0 rounded-3xl">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={30} round />
          </FacebookShareButton>
          <TelegramShareButton
            url={shareUrl}
            title="amazing book"
            separator="*************************"
          >
            <TelegramIcon size={30} round />
          </TelegramShareButton>
          <WhatsappShareButton url={shareUrl} title="amazing book">
            <WhatsappIcon size={30} round />
          </WhatsappShareButton>
          <LinkedinShareButton
            url={shareUrl}
            title="amazing book"
            summary="I found this book very useful"
          >
            <LinkedinIcon size={30} round />
          </LinkedinShareButton>
        </div>
      )}
    </div>
  );
}
