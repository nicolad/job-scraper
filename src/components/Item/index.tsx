"use client";

import {
  ItemWrapper,
  InfoContainer,
  InProgressIcon,
  DoneIcon,
  ContentRow,
  Upvote,
  ItemLink,
} from "./styles";
import { upvoteItem } from "@/utils/server-actions";
import { FaCircleCheck, FaClock, FaHeart } from "react-icons/fa6";
import DeleteButton from "@/components/DeleteButton";
import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import { useAppContext } from "@/utils/appContext";

interface Props {
  name: string;
  status: string;
  votes: string;
  url: string;
}

export default function Item({ name, status, votes, url }: Props) {
  const path = usePathname();
  const { isUpvoting, setIsUpvoting, filter } = useAppContext();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isUpvoting) {
      timer = setTimeout(() => {
        setIsUpvoting(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isUpvoting]);

  const handleUpvoteClick = async () => {
    if (!isUpvoting) {
      setIsUpvoting(true);
      upvoteItem(name, Number(votes));
    }
  };

  if (filter.includes(status)) {
  return (
    <ItemWrapper status={status.replace(/\s/g, '') as any}>
      <InfoContainer>
        <ContentRow>
          <h2>{name}</h2>
          {status === "In Progress" && (
            <InProgressIcon title="In progress">
              <FaClock />
            </InProgressIcon>
          )}
          {status === "Done" && (
            <DoneIcon title="Done">
              <FaCircleCheck />
            </DoneIcon>
          )}
          {path === "/admin" && <DeleteButton itemName={name} />}
        </ContentRow>
        <ContentRow>
          <Upvote onClick={handleUpvoteClick} disabled={isUpvoting}>
            <FaHeart />
          </Upvote>
          <h3>{votes}</h3>
        </ContentRow>
      </InfoContainer>
      {status === "Done" && (
        <InfoContainer>
          <ItemLink href={url} target="_blank">
            {url}
          </ItemLink>
        </InfoContainer>
      )}
    </ItemWrapper>
  );}
}
