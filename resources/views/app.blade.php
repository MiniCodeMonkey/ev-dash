@extends('layouts.app')

@section('content')
<div id="app"></div>

<script>
window.__INITIAL_STATE__ = {!! json_encode($initialState) !!};
</script>
@endsection