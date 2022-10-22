import { Helmet } from 'react-helmet-async';

const MetaData = ({ title, description  }) => {
    if (!description )
    {
        description = "تسوق , متجر الكتروني يوفر لك ما تحتاجه"
    }


    return (
        <Helmet>
           
            <title>{` تسوق - ${title}  `}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

export default MetaData
