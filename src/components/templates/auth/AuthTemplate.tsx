import { styled } from "@mui/system";

const PageWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

const BackgroundImage = styled('div')<{ backgroundImage: string }>(({ backgroundImage }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 0,
  backgroundImage: `url(${backgroundImage})`,
}));

interface AuthTemplateProps {
  children: React.ReactNode;
  backgroundImage: string;
}

export const AuthTemplate = ({ children, backgroundImage }: AuthTemplateProps) => (
  <PageWrapper>
    <BackgroundImage backgroundImage={backgroundImage} />
    {children}
  </PageWrapper>
);