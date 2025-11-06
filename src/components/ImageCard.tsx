import {
  Box,
  BoxProps,
  Img,
  ImgProps,
  Flex,
  Text,
  IconButton,
  IconButtonProps,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ImageCardProps } from '@/typings/image';
import { Heart } from 'phosphor-react';
import { motion } from 'framer-motion';
import InitialLikesContext from '@/context/Likes';
import likeImage from '@/utils/likeImage';
import { useState, useEffect, useContext } from 'react';
import MediaTypeTag from './MediaTypeTag';

const MotionBox = motion<BoxProps>(Box);
// @ts-ignore
const MotionImg = motion<ImgProps>(Img);
// @ts-ignore
const MotionIconButton = motion<IconButtonProps>(IconButton);

function ImageCard({ src, title, date, mediaType }: ImageCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const initialLikes = useContext(InitialLikesContext);
  const [isLiked, setIsLiked] = useState(initialLikes[title]);
  const bg = useColorModeValue(`white`, `gray.800`);

  // hydrate the isLiked state from the value from context
  useEffect(() => {
    if (initialLikes[title]) {
      setIsLiked(initialLikes[title]);
    }
  }, [initialLikes, title]);

  // toggle the like
  const LikeThisImage = () => {
    likeImage(title);
    setIsLiked((curr) => !curr);
  };

  return (
    // @ts-ignore
    <Flex
      as="article"
      flexDir="column"
      justifyContent="space-between"
      borderWidth="1px"
      bg={bg}
      p={4}
    >
      <NextLink href={`/image/${date}`} passHref legacyBehavior>
        <MotionBox
          as="a"
          borderRadius="md"
          whileHover={{ scale: 1.02 }}
          overflow="hidden"
          minH="30rem"
          flexGrow={1}
        >
          <MotionImg
            src={src}
            alt={title}
            initial={{ scale: 1.05 }}
            animate={{
              scale: isImageLoaded ? 1.05 : 1,
            }}
            whileHover={{ scale: 1 }}
            borderRadius="md"
            onLoad={() => setIsImageLoaded(true)}
            h="100%"
            objectFit="cover"
          />
        </MotionBox>
      </NextLink>
      <Flex mt={2} alignItems="center" justifyContent="space-between">
        <VStack justifyContent="space-between" alignItems="flex-start">
          <Text
            as="h2"
            fontSize="xl"
            fontWeight="semibold"
            lineHeight="shorter"
          >
            {title}
          </Text>
          <Text>{date}</Text>
          <MediaTypeTag mediaType={mediaType} />
        </VStack>
        <MotionIconButton
          aria-label="Like image"
          icon={<Heart weight={isLiked ? `fill` : `regular`} size="32px" />}
          whileTap={{ scale: 0.8 }}
          variant="unstyled"
          display="flex"
          color={isLiked ? `red.500` : `gray.500`}
          onClick={LikeThisImage}
        />
      </Flex>
    </Flex>
  );
}

export default ImageCard;
