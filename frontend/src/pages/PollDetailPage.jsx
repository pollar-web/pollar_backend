import { Typography, Box, Stack, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import PollDetail from '../components/detailpoll/PollDetail'
import { getVoteInfo } from '../services/api/PollApi';
import { useEffect, useState } from 'react';
import { getPollCategory } from '../services/api/CategoryApi';
import { getRelies } from '../services/api/ReplyApi';
import ReplyForm from '../components/detailpoll/ReplyForm';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function PollDetailPage() {
  let { id } = useParams();     // url에 있는 path variable을 가져옴
  const [voteInfo, setVoteInfo] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  const [replies, setReplies] = useState([]);

  const getVote = async () => {   // voteInfo랑 categories 가져오기
    const data = await getVoteInfo(id);
    setVoteInfo(data);
  };
  const loadReply = async () => {
    const replyList = await getRelies(id);
    setReplies(replyList)
  }
  
  useEffect(() => {
    getVote();
    loadReply();
  }, [id])
  
  return (
    <>
      <Stack direction="row">
          <Card >
          <Box component="div"
            paddingBottom={3}
            paddingLeft={2}
            paddingRight={2}
            style={{
              overflowY: "scroll" // added scroll
            }}
          >
          <ReplyForm
            replies={replies}
          />
        </Box>
        </Card>
        </Stack>
    </>
  );
}
