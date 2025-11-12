import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [classes, setClasses] = useState([]); // JSONのデータを入れる
  const [grade, setGrade] = useState('');     // 選択した学年
  const [id, setId] = useState('');           // 選択した学籍番号
  const [selected, setSelected] = useState(null); // 表示用

  // JSONファイルを読み込む
  useEffect(() => {
    fetch('/classes.json')         // publicフォルダのclasses.jsonを読み込む
      .then(res => res.json())
      .then(data => setClasses(data));
  }, []);

 // 表示ボタン押下時
 const handleClick = () => {
  if (!grade) {
    alert('学年を選んでください');
    return;
  }

  // 選択した学年の学籍番号一覧
  const filteredIds = classes
    .filter(c => c.grade === Number(grade))
    .map(c => c.class_name);

  if (id) {
    // 学籍番号が選択されていればそれだけ表示
    setSelected({ grade, ids: [id] });
  } else {
    // 学籍番号未選択なら学年の全学籍番号を表示
    setSelected({ grade, ids: filteredIds });
  }
};

  // 学年だけ抽出（重複削除）
  const grades = [...new Set(classes.map(c => c.grade))];
  // 選択した学年の学籍番号だけ抽出
  const ids = classes.filter(c => c.grade === Number(grade)).map(c => c.class_name);

  return (
    <div>
      <select value={grade} onChange={e => setGrade(e.target.value)}>
        <option value="">学年選択</option>
        {grades.map(g => <option key={g} value={g}>{g}年</option>)}
      </select>

      <select value={id} onChange={e => setId(e.target.value)}>
        <option value="">学籍番号選択</option>
        {ids.map(i => <option key={i} value={i}>{i}</option>)}
      </select>

      <button onClick={handleClick}>表示</button>

      {selected && (
        <div>
        <label>学年: {selected.grade}年</label><br />     
        <label>学籍番号: {selected.ids.join(', ')}</label>
        </div>
      )}
    </div>
  );
}

export default App;
