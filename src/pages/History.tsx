import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HistoryApi } from '../api/ApiService';

const History: React.FC = () => {
    const { noteId } = useParams();
    const [hist, setHist] = useState<any[]>([]);
    useEffect(() => { HistoryApi.getByNote(Number(noteId)).then(r => setHist(r.data)); }, [noteId]);
    return (
        <div className="p-4">
            <h1>History for Note {noteId}</h1>
            <ul>{hist.map(h=><li key={h.id}>{h.updatedAt}: {h.content}</li>)}</ul>
        </div>
    );
};
export default History;