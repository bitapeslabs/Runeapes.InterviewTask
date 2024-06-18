import { Carousel } from "../../features/ui";
import * as S from "./index.styled";
import { DATA_LIST } from "../../utils/dataUtils";

const Home = () => {
  return (
    <S.Container>
      <Carousel
        isInfinite={true}
        viewCount={2}
        gap={16}
        datas={DATA_LIST}
        fullWidth={true}
        viewWidth={800}
        viewHeight={300}
        handler
        auto
        duration={5}
      />
    </S.Container>
  );
};

export default Home;
