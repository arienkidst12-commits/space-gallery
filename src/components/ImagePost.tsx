import {
  Img,
  ImgProps,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import MediaTypeTag from './MediaTypeTag';
import PostActions from './PostActions';
import type { ImagePostProps } from '@/typings/image';
import { Calendar, ChatDots, Copyright } from 'phosphor-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// @ts-ignore
const MotionImg = motion<ImgProps>(Img);

function ImagePost({
  src,
  hdSrc,
  title,
  date,
  mediaType,
  description,
  copyright,
}: ImagePostProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const bg = useColorModeValue(`white`, `gray.800`);
  const iconColor = useColorModeValue(`gray.600`, `gray.500`);

  return (
    // @ts-ignore
    <VStack as="article" borderWidth="1px" bg={bg} p={4}>
      <MotionImg
        src={src}
        alt={title}
        initial={{ scale: 0.9 }}
        animate={{
          scale: isImageLoaded ? 1 : 0.9,
        }}
        onLoad={() => setIsImageLoaded(true)}
        borderRadius="md"
        flexGrow={1}
        minH="30rem"
        w="100%"
        objectFit="cover"
      />
      <Flex mt={2} alignItems="center" justifyContent="space-between">
        <VStack justifyContent="space-between" alignItems="flex-start">
          <HStack flexWrap="wrap">
            <Text as="h2" fontSize="xl" fontWeight="semibold">
              {title}
            </Text>
            <MediaTypeTag mediaType={mediaType} />
          </HStack>
          <HStack>
            <Icon as={Calendar} boxSize="18px" color={iconColor} />
            {` `}
            <Text>{date}</Text>
          </HStack>
          <HStack>
            <Icon
              as={ChatDots}
              boxSize="18px"
              color={iconColor}
              alignSelf="flex-start"
            />
            <Text>{description}</Text>
          </HStack>
          {copyright ? (
            <HStack>
              <Icon as={Copyright} color={iconColor} boxSize="18px" />
              <Text>{copyright}</Text>
            </HStack>
          ) : null}
        </VStack>
      </Flex>
      <Divider pt={2} />
      <PostActions src={hdSrc} />
    </VStack>
  );
}

export default ImagePost;
