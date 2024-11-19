import s from './documentationSection.module.scss';
import { DocumentData } from '@/common/types';
import { DocumentCard } from '@/components/documentCard/documentCard';
import { useCarousel } from '@/common/customHooks/useCarousel';
import { NavPanel } from '@/components/navPanel/navPanel';

type DocumentationSectionProps = {
  documents: DocumentData[];
};

const DocumentationSection = (props: DocumentationSectionProps) => {
  const { documents } = props;

  const {
    activeIndex,
    cardStatus,
    direction,
    prevItem,
    nextItem,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
  } = useCarousel(documents);

  const isDocsExist = documents && documents.length;

  return (
    <section className={s.docSection}>
      <h2>Документация</h2>
      <div className={'fullContainer ' + s.background}>
        документац
        <wbr />
        ия
      </div>
      {isDocsExist && (
        <div
          className={s.carousel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className={s.itemsContainer}>
            {documents.map((document, index) => (
              <DocumentCard
                key={index}
                document={document}
                status={cardStatus[index]}
                direction={direction}
              />
            ))}
          </div>
          <NavPanel
            items={documents}
            onBackClick={prevItem}
            onForwardClick={nextItem}
            activeIndex={activeIndex}
            className={s.navPanel}
          />
        </div>
      )}
    </section>
  );
};

export default DocumentationSection;
