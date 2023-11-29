import styled from 'styled-components';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

export const ItemsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 150px;
`;

export const FiltersContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 100px;
`

export const SelectWrapper = styled.div`
    display: flex;
    justify-content: space-around;

    div {
        margin: 0px 25px;
    }
`

export const SortDirectionButton = styled(PrimaryButton)`
    display: flex;
    padding: 0px;
    height: 100%;
    margin: 0;
`